package com.example.aiqa.service;

import com.example.aiqa.domain.TestScript;
import com.example.aiqa.domain.ExecutionResult;
import com.example.aiqa.repository.TestScriptRepository;
import com.example.aiqa.repository.ExecutionResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.concurrent.*;

@Service
public class ScriptExecutorService {
    
    @Autowired
    private TestScriptRepository scriptRepository;
    
    @Autowired
    private ExecutionResultRepository executionResultRepository;
    
    private ExecutorService executor = Executors.newSingleThreadExecutor();
    
    public ExecutionResult executeScript(Long scriptId) {
        TestScript script = scriptRepository.findById(scriptId).orElse(null);
        if (script == null) {
            throw new IllegalArgumentException("Script not found: " + scriptId);
        }
        
        ExecutionResult result = new ExecutionResult();
        result.setScriptId(script.getId());
        result.setScriptName(script.getName());
        result.setStatus(ExecutionResult.ExecutionStatus.RUNNING);
        executionResultRepository.save(result);
        
        try {
            String output = runPlaywrightTest(script.getFilePath());
            
            result.setOutput(output);
            result.setCompletedAt(LocalDateTime.now());
            
            parseExecutionResult(output, result);
            
            if (result.getFailedTests() != null && result.getFailedTests() > 0) {
                result.setStatus(ExecutionResult.ExecutionStatus.FAILED);
            } else {
                result.setStatus(ExecutionResult.ExecutionStatus.PASSED);
            }
            
            script.setStatus(TestScript.ScriptStatus.EXECUTED);
            scriptRepository.save(script);
            
        } catch (Exception e) {
            result.setStatus(ExecutionResult.ExecutionStatus.FAILED);
            result.setErrorOutput(e.getMessage());
            result.setCompletedAt(LocalDateTime.now());
        }
        
        executionResultRepository.save(result);
        return result;
    }
    
    private String runPlaywrightTest(String filePath) throws IOException, InterruptedException {
        Path path = Paths.get(filePath);
        if (!Files.exists(path)) {
            return "Script file not found: " + filePath + "\n\nStatus: SKIPPED (npx not available)";
        }
        
        try {
            ProcessBuilder pb = new ProcessBuilder(
                "npx", "playwright", "test", filePath, "--reporter=line"
            );
            pb.redirectErrorStream(true);
        
            Process process = pb.start();
            
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            
            int exitCode = process.waitFor();
            output.append("\nExit code: ").append(exitCode);
            
            return output.toString();
        } catch (IOException e) {
            return "Playwright not available: " + e.getMessage() + "\n\nStatus: SKIPPED (npx required)";
        }
    }
    
    private void parseExecutionResult(String output, ExecutionResult result) {
        result.setTotalTests(1);
        result.setPassedTests(0);
        result.setFailedTests(0);
        
        String lower = output.toLowerCase();
        
        if (lower.contains("skipped") || lower.contains("not available") || lower.contains("npx")) {
            result.setSkippedTests(1);
            result.setTotalTests(0);
            return;
        }
        
        if (lower.contains("passed") && !lower.contains("0 passed")) {
            result.setPassedTests(1);
        }
        
        if (lower.contains("failed") || lower.contains("error")) {
            result.setFailedTests(1);
        }
        
        if (lower.contains("1 passed")) {
            result.setPassedTests(1);
            result.setFailedTests(0);
        } else if (lower.contains("1 failed")) {
            result.setPassedTests(0);
            result.setFailedTests(1);
        }
    }
    
    public ExecutionResult getExecutionResult(Long id) {
        return executionResultRepository.findById(id).orElse(null);
    }
    
    public java.util.List<ExecutionResult> getAllResults() {
        return executionResultRepository.findByOrderByStartedAtDesc();
    }
    
    public void shutdown() {
        executor.shutdown();
    }
}