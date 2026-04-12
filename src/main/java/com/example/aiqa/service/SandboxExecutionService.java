package com.example.aiqa.service;

import com.example.aiqa.domain.Script;
import com.example.aiqa.repository.ScriptRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@Service
@Transactional
public class SandboxExecutionService {
    
    private static final Logger log = LoggerFactory.getLogger(SandboxExecutionService.class);
    
    private final ScriptRepository scriptRepository;
    private final ObjectMapper objectMapper;
    private final String sandboxPath;
    private final int executionTimeout;
    private final ExecutorService executorService;
    
    public SandboxExecutionService(ScriptRepository scriptRepository) {
        this.scriptRepository = scriptRepository;
        this.objectMapper = new ObjectMapper();
        this.sandboxPath = System.getProperty("SANDBOX_PATH",
            "C:\\Users\\DSi\\Desktop\\PROJECTS\\AIQA\\playwright-runner\\sandbox.js");
        this.executionTimeout = Integer.parseInt(
            System.getProperty("EXECUTION_TIMEOUT", "60000"));
        this.executorService = Executors.newCachedThreadPool();
    }
    
    @Async
    public CompletableFuture<SandboxResult> executeAsync(Long scriptId, String browser, boolean headed) {
        log.info("Starting async execution for script: {}", scriptId);
        
        try {
            SandboxResult result = executeSync(scriptId, browser, headed);
            return CompletableFuture.completedFuture(result);
        } catch (Exception e) {
            log.error("Async execution failed", e);
            return CompletableFuture.completedFuture(
                SandboxResult.failure(e.getMessage(), new ArrayList<>(), 0L)
            );
        }
    }
    
    public SandboxResult executeSync(Long scriptId, String browser, boolean headed) {
        Script script = scriptRepository.findById(scriptId)
            .orElseThrow(() -> new RuntimeException("Script not found: " + scriptId));
        
        long startTime = System.currentTimeMillis();
        List<LogEntry> logs = new ArrayList<>();
        
        log.info("Starting sandbox execution for script: {}", scriptId);
        addLog(logs, "info", "Starting sandbox execution...");
        addLog(logs, "info", "Browser: " + browser + (headed ? " (headed)" : " (headless)"));
        addLog(logs, "info", "Script: " + script.getName());
        
        String scriptContent = script.getContent();
        
        log.info("Script content length: {}", scriptContent != null ? scriptContent.length() : 0);
        
        if (scriptContent == null || scriptContent.isEmpty()) {
            addLog(logs, "error", "Script content is empty");
            log.error("Script content is empty for scriptId: {}", scriptId);
            return SandboxResult.failure("Script is empty", logs, 0);
        }
        
        try {
            log.info("Running sandbox...");
            String result = runSandbox(scriptContent, browser, headed);
            
            log.info("Sandbox raw output: {}", result != null ? result.substring(0, Math.min(500, result.length())) : "NULL");
            addLog(logs, "info", "Sandbox returned: " + (result != null ? result.length() : 0) + " chars");
            
            SandboxResult sandboxResult = parseResult(result, logs);
            
            log.info("Parsed result status: {}, logs count: {}", sandboxResult.status(), sandboxResult.logs().size());
            
            // Update script
            script.setLastRun(LocalDateTime.now());
            script.setLastStatus(sandboxResult.status());
            script.setExecutionTime(sandboxResult.executionTime());
            scriptRepository.save(script);
            
            return sandboxResult;
            
        } catch (Exception e) {
            log.error("Execution failed", e);
            addLog(logs, "error", "Execution failed: " + e.getMessage());
            return SandboxResult.failure(e.getMessage(), logs, 
                System.currentTimeMillis() - startTime);
        }
    }
    
    private String runSandbox(String script, String browser, boolean headed) throws Exception {
        // First, test if node works at all
        ProcessBuilder testPb = new ProcessBuilder("node", "--version");
        testPb.redirectErrorStream(true);
        Process testProcess = testPb.start();
        StringBuilder testOutput = new StringBuilder();
        BufferedReader testReader = new BufferedReader(new InputStreamReader(testProcess.getInputStream()));
        String testLine;
        while ((testLine = testReader.readLine()) != null) testOutput.append(testLine).append("\n");
        int testExit = testProcess.waitFor();
        log.info("Node version check: exit={}, output={}", testExit, testOutput);
        
        // Create temp file for script
        File tempFile = File.createTempFile("aiqa_script_", ".js");
        try {
            Files.write(tempFile.toPath(), script.getBytes());
            
            // Pass script via temp file (avoids command line escaping issues)
            String cmd = "node \"" + sandboxPath + "\" \"" + tempFile.getAbsolutePath() + "\" --browser=" + browser + " --headless=" + !headed + " --timeout=" + executionTimeout;
            log.info("Running command: {}", cmd);
            
            ProcessBuilder pb = new ProcessBuilder("cmd", "/c", cmd);
            pb.redirectErrorStream(true);
            
            Process process = pb.start();
            
            // Read output with separate error reader
            StringBuilder output = new StringBuilder();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
                log.debug("Sandbox output line: {}", line);
            }
            reader.close();
            
            int exitCode = process.waitFor();
            log.info("Sandbox exited with code: {}", exitCode);
            
            return output.toString();
        } catch (Exception e) {
            log.error("Sandbox execution error", e);
            throw e;
        } finally {
            if (tempFile.exists()) {
                tempFile.delete();
            }
        }
    }
    
    private SandboxResult parseResult(String output, List<LogEntry> logs) {
        String jsonStr = extractJson(output);
        
        if (jsonStr == null) {
            addLog(logs, "error", "Failed to parse sandbox response");
            return SandboxResult.failure("Invalid response", logs, 0);
        }
        
        try {
            JsonNode node = objectMapper.readTree(jsonStr);
            
            String status = node.has("status") ? node.get("status").asText() : "FAIL";
            
            ErrorInfo error = null;
            if (node.has("error") && !node.get("error").isNull()) {
                JsonNode err = node.get("error");
                error = new ErrorInfo(
                    err.has("message") ? err.get("message").asText() : "Unknown",
                    err.has("stack") ? err.get("stack").asText() : null,
                    err.has("line") ? err.get("line").asInt() : null
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
                node.get("executionTime").asLong() : 0;
            
            return new SandboxResult(status, error, parsedLogs, screenshots,
                node.has("video") ? node.get("video").asText() : null, executionTime);
            
        } catch (Exception e) {
            addLog(logs, "error", "Parse error: " + e.getMessage());
            return SandboxResult.failure("Parse error: " + e.getMessage(), logs, 0);
        }
    }
    
    private String extractJson(String output) {
        if (output == null || output.isEmpty()) {
            log.warn("Empty output from sandbox");
            return null;
        }
        
        log.info("Full output length: {}, first 800 chars: {}", output.length(), output.substring(0, Math.min(800, output.length())));
        
        int start = output.indexOf("=== AIQA_RESPONSE_START ===");
        int end = output.indexOf("=== AIQA_RESPONSE_END ===");
        
        log.info("JSON markers: start={}, end={}", start, end);
        
        if (start >= 0 && end > start) {
            String json = output.substring(start + 27, end).trim();
            log.info("Extracted JSON (first 200): {}", json.substring(0, Math.min(200, json.length())));
            return json;
        }
        
        // Try direct JSON
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
        
        log.warn("Could not extract JSON from output");
        return null;
    }
    
    private void addLog(List<LogEntry> logs, String type, String message) {
        logs.add(new LogEntry(type, message, LocalDateTime.now().toString()));
    }
    
    // ==================== RECORDS ====================
    
    public record SandboxResult(
        String status,
        ErrorInfo error,
        List<LogEntry> logs,
        List<String> screenshots,
        String video,
        Long executionTime
    ) {
        public static SandboxResult failure(String message, List<LogEntry> logs, long time) {
            return new SandboxResult("FAIL", new ErrorInfo(message, null, null), 
                logs, new ArrayList<>(), null, time);
        }
    }
    
    public record ErrorInfo(String message, String stack, Integer line) {}
    
    public record LogEntry(String type, String message, String timestamp) {}
}
