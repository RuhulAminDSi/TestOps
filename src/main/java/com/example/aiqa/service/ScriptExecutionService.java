package com.example.aiqa.service;

import com.example.aiqa.domain.Script;
import com.example.aiqa.repository.ScriptRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

@Service
@Transactional
public class ScriptExecutionService {
    
    private final ScriptRepository scriptRepository;
    private final String runnerPath;
    private final int executionTimeout;
    private final ObjectMapper objectMapper;
    
    public ScriptExecutionService(ScriptRepository scriptRepository) {
        this.scriptRepository = scriptRepository;
        this.runnerPath = System.getProperty("RUNNER_PATH", 
            "C:\\Users\\DSi\\Desktop\\PROJECTS\\AIQA\\playwright-runner\\runner.js");
        this.executionTimeout = Integer.parseInt(
            System.getProperty("EXECUTION_TIMEOUT", "120000"));
        this.objectMapper = new ObjectMapper();
    }
    
    public ExecutionResult executeScript(Long scriptId, String browser, boolean headed) {
        Script script = scriptRepository.findById(scriptId)
            .orElseThrow(() -> new RuntimeException("Script not found with id: " + scriptId));
        
        long startTime = System.currentTimeMillis();
        List<LogEntry> logs = new ArrayList<>();
        
        addLog(logs, "info", "Starting Playwright execution...");
        addLog(logs, "info", "Browser: " + browser + (headed ? " (headed)" : " (headless)"));
        addLog(logs, "info", "Script: " + script.getName());
        
        String scriptContent = script.getContent();
        
        if (scriptContent == null || scriptContent.isEmpty()) {
            addLog(logs, "error", "Script content is empty");
            return new ExecutionResult("FAIL", null, null, logs, new ArrayList<>(), null, 0L);
        }
        
        try {
            addLog(logs, "info", "Executing script...");
            
            String result = runNodeRunner(scriptContent, browser, headed, logs);
            
            ExecutionResult execResult = parseResponse(result, logs);
            
            script.setLastRun(LocalDateTime.now());
            script.setLastStatus(execResult.status());
            script.setExecutionTime(execResult.executionTime());
            scriptRepository.save(script);
            
            return execResult;
            
        } catch (Exception e) {
            addLog(logs, "error", "Execution failed: " + e.getMessage());
            return new ExecutionResult(
                "FAIL", null, new RuntimeError(e.getMessage(), null), 
                logs, new ArrayList<>(), null, System.currentTimeMillis() - startTime
            );
        }
    }
    
    private String runNodeRunner(String script, String browser, boolean headed, List<LogEntry> logs) 
            throws Exception {
        
        File tempDir = new File(System.getProperty("java.io.tmpdir"), "aiqa-scripts");
        if (!tempDir.exists()) {
            tempDir.mkdirs();
        }
        
        File scriptFile = new File(tempDir, "script_" + System.currentTimeMillis() + ".js");
        try (FileWriter fw = new FileWriter(scriptFile)) {
            fw.write(script);
        }
        
        String scriptPath = scriptFile.getAbsolutePath().replace("\\", "\\\\");
        
        ProcessBuilder pb = new ProcessBuilder(
            "node", runnerPath, 
            "{\"script\":\"" + scriptPath + "\",\"browser\":\"" + browser + "\",\"headed\":" + headed + "}"
        );
        pb.directory(tempDir);
        pb.redirectErrorStream(true);
        
        addLog(logs, "info", "Executing Node.js runner...");
        
        Process process = pb.start();
        
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<String> future = executor.submit(() -> {
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            return output.toString();
        });
        
        try {
            String output = future.get(executionTimeout, TimeUnit.MILLISECONDS);
            return output;
            
        } catch (TimeoutException e) {
            process.destroyForcibly();
            addLog(logs, "error", "Execution timed out after " + executionTimeout + "ms");
            throw new Exception("Execution timed out");
            
        } finally {
            executor.shutdownNow();
            scriptFile.delete();
        }
    }
    
    private ExecutionResult parseResponse(String output, List<LogEntry> logs) {
        String jsonStr = extractJsonFromOutput(output);
        
        if (jsonStr == null) {
            addLog(logs, "error", "Failed to parse runner response");
            return new ExecutionResult("FAIL", null, null, logs, new ArrayList<>(), null, 0L);
        }
        
        try {
            JsonNode node = objectMapper.readTree(jsonStr);
            
            String status = node.has("status") ? node.get("status").asText() : "FAIL";
            
            SyntaxError syntaxError = null;
            if (node.has("syntaxError") && !node.get("syntaxError").isNull()) {
                JsonNode se = node.get("syntaxError");
                syntaxError = new SyntaxError(
                    se.has("message") ? se.get("message").asText() : "Unknown",
                    se.has("line") ? se.get("line").asInt() : 0
                );
            }
            
            RuntimeError runtimeError = null;
            if (node.has("runtimeError") && !node.get("runtimeError").isNull()) {
                JsonNode re = node.get("runtimeError");
                runtimeError = new RuntimeError(
                    re.has("message") ? re.get("message").asText() : "Unknown",
                    re.has("stack") ? re.get("stack").asText() : null
                );
            }
            
            List<LogEntry> parsedLogs = new ArrayList<>();
            if (node.has("logs")) {
                for (JsonNode logNode : node.get("logs")) {
                    parsedLogs.add(new LogEntry(
                        logNode.has("type") ? logNode.get("type").asText() : "info",
                        logNode.has("message") ? logNode.get("message").asText() : "",
                        logNode.has("timestamp") ? logNode.get("timestamp").asText() : null
                    ));
                }
            }
            
            List<String> screenshots = new ArrayList<>();
            if (node.has("screenshots")) {
                for (JsonNode ss : node.get("screenshots")) {
                    screenshots.add(ss.asText());
                }
            }
            
            long executionTime = node.has("executionTime") ? 
                node.get("executionTime").asLong() : 0L;
            
            return new ExecutionResult(status, syntaxError, runtimeError, parsedLogs, 
                screenshots, node.has("video") ? node.get("video").asText() : null, executionTime);
            
        } catch (Exception e) {
            addLog(logs, "error", "Failed to parse response: " + e.getMessage());
            return new ExecutionResult(
                "FAIL", null, new RuntimeError("Parse error: " + e.getMessage(), null),
                logs, new ArrayList<>(), null, 0L
            );
        }
    }
    
    private String extractJsonFromOutput(String output) {
        int start = output.indexOf("=== AIQA_RESPONSE_START ===");
        int end = output.indexOf("=== AIQA_RESPONSE_END ===");
        
        if (start >= 0 && end > start) {
            return output.substring(start + 34, end).trim();
        }
        
        start = output.indexOf("{");
        if (start >= 0) {
            int braceCount = 0;
            boolean inString = false;
            for (int i = start; i < output.length(); i++) {
                char c = output.charAt(i);
                if (c == '"' && (i == 0 || output.charAt(i-1) != '\\')) {
                    inString = !inString;
                }
                if (!inString) {
                    if (c == '{') braceCount++;
                    if (c == '}') braceCount--;
                    if (braceCount == 0 && i > start) {
                        return output.substring(start, i + 1);
                    }
                }
            }
        }
        
        return null;
    }
    
    private void addLog(List<LogEntry> logs, String type, String message) {
        logs.add(new LogEntry(type, message, LocalDateTime.now().toString()));
    }
    
    // ==================== RECORD CLASSES ====================
    
    public record ExecutionResult(
        String status,
        SyntaxError syntaxError,
        RuntimeError runtimeError,
        List<LogEntry> logs,
        List<String> screenshots,
        String video,
        Long executionTime
    ) {}
    
    public record SyntaxError(String message, int line) {}
    
    public record RuntimeError(String message, String stack) {}
    
    public record LogEntry(String type, String message, String timestamp) {}
}
