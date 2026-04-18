package com.example.aiqa.controller;

import com.example.aiqa.domain.TestScript;
import com.example.aiqa.domain.ExecutionResult;
import com.example.aiqa.dto.AIGenerateRequest;
import com.example.aiqa.dto.AIGenerateResponse;
import com.example.aiqa.service.ScriptGeneratorService;
import com.example.aiqa.service.ScriptExecutorService;
import com.example.aiqa.service.BrowserAutomationService;
import com.example.aiqa.service.PlaywrightMCPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Controller
public class AITestController {
    
    @Autowired
    private ScriptGeneratorService scriptGeneratorService;
    
    @Autowired
    private ScriptExecutorService scriptExecutorService;
    
    @Autowired
    private BrowserAutomationService browserService;
    
    @Autowired
    private PlaywrightMCPService mcpService;
    
    @PostMapping("/api/ai-test/generate")
    @ResponseBody
    public ResponseEntity<AIGenerateResponse> generateTest(@RequestBody AIGenerateRequest request) {
        try {
            TestScript script = scriptGeneratorService.generateScript(
                request.getInstruction(),
                request.getUrl(),
                request.getUsername(),
                request.getPassword(),
                request.getAiProvider(),
                true
            );
            
            AIGenerateResponse response = new AIGenerateResponse();
            response.setSuccess(true);
            response.setScriptId(script.getId());
            response.setScriptName(script.getName());
            response.setFilePath(script.getFilePath());
            response.setScriptContent(script.getContent());
            response.setStatus(script.getStatus().name());
            response.setCreatedAt(script.getCreatedAt());
            response.setMessage("Script generated successfully");
            
            if (request.getAutoExecute()) {
                ExecutionResult result = scriptExecutorService.executeScript(script.getId());
                response.setExecutionId(result.getId());
                response.setExecutionStatus(result.getStatus().name());
                response.setOutput(result.getOutput());
                response.setPassedTests(result.getPassedTests());
                response.setFailedTests(result.getFailedTests());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(AIGenerateResponse.error("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/api/ai-test/scripts")
    @ResponseBody
    public ResponseEntity<List<TestScript>> getAllScripts() {
        List<TestScript> scripts = scriptGeneratorService.getAllScripts();
        return ResponseEntity.ok(scripts);
    }
    
    @GetMapping("/api/ai-test/scripts/{id}")
    @ResponseBody
    public ResponseEntity<TestScript> getScript(@PathVariable Long id) {
        TestScript script = scriptGeneratorService.getScript(id);
        if (script == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(script);
    }
    
    @PutMapping("/api/ai-test/scripts/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> updateScript(@PathVariable Long id, @RequestBody Map<String, String> body) {
        TestScript script = scriptGeneratorService.getScript(id);
        if (script == null) {
            return ResponseEntity.notFound().build();
        }
        
        if (body.containsKey("name")) script.setName(body.get("name"));
        if (body.containsKey("content")) script.setContent(body.get("content"));
        
        scriptGeneratorService.saveScript(script);
        
        return ResponseEntity.ok(Map.of("success", true, "message", "Script updated"));
    }
    
    @DeleteMapping("/api/ai-test/scripts/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> deleteScript(@PathVariable Long id) {
        try {
            TestScript script = scriptGeneratorService.getScript(id);
            if (script != null && script.getFilePath() != null) {
                java.nio.file.Files.deleteIfExists(java.nio.file.Paths.get(script.getFilePath()));
            }
            scriptGeneratorService.deleteScript(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Script deleted"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    
    @PostMapping("/api/ai-test/run/{scriptId}")
    @ResponseBody
    public ResponseEntity<ExecutionResult> runScript(@PathVariable Long scriptId) {
        try {
            ExecutionResult result = scriptExecutorService.executeScript(scriptId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/api/ai-test/history")
    @ResponseBody
    public ResponseEntity<List<ExecutionResult>> getExecutionHistory() {
        List<ExecutionResult> results = scriptExecutorService.getAllResults();
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/api/ai-test/execution/{id}")
    @ResponseBody
    public ResponseEntity<ExecutionResult> getExecutionResult(@PathVariable Long id) {
        ExecutionResult result = scriptExecutorService.getExecutionResult(id);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/api/ai-test/analyze")
    @ResponseBody
    public ResponseEntity<Object> analyzePage(@RequestParam String url) {
        try {
            Object analysis = browserService.analyzePage(url);
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/api/ai-test/providers")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getProviders() {
        Map<String, Object> providers = new HashMap<>();
        providers.put("openai", Map.of("id", "openai", "name", "OpenAI GPT-4", "available", true));
        providers.put("opencode", Map.of("id", "opencode", "name", "opencode AI", "available", true));
        providers.put("ollama", Map.of("id", "ollama", "name", "Ollama Local", "available", false));
        providers.put("claude", Map.of("id", "claude", "name", "Anthropic Claude", "available", false));
        return ResponseEntity.ok(providers);
    }
    
    @GetMapping("/scripts/{filename}")
    @ResponseBody
    public ResponseEntity<byte[]> getScriptFile(@PathVariable String filename) {
        try {
            Path scriptPath = Paths.get("scripts", filename);
            if (Files.exists(scriptPath)) {
                byte[] content = Files.readAllBytes(scriptPath);
                return ResponseEntity.ok()
                    .header("Content-Type", "application/typescript")
                    .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                    .body(content);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/api/ai-test/execute")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> executeInstruction(
            @RequestParam String url,
            @RequestParam String instruction,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) String provider,
            @RequestParam(defaultValue = "false") boolean run) {
        
        Map<String, Object> result = new HashMap<>();
        String lower = instruction.toLowerCase();
        
        result.put("url", url);
        result.put("instruction", instruction);
        result.put("username", username != null ? username : "(not provided)");
        result.put("password", password != null ? "***" : "(not provided)");
        
        List<Map<String, Object>> actions = new java.util.ArrayList<>();
        
        actions.add(Map.of("step", 1, "action", "navigate", "selector", url, "status", "pending"));
        
        if (lower.contains("login") || lower.contains("signin")) {
            if (username != null && !username.isBlank()) {
                actions.add(Map.of("step", 2, "action", "fill", "selector", "input[name='username']", "value", username));
            }
            if (password != null && !password.isBlank()) {
                actions.add(Map.of("step", 3, "action", "fill", "selector", "input[name='password']", "value", "***"));
            }
            actions.add(Map.of("step", 4, "action", "click", "selector", "button[type='submit']"));
            actions.add(Map.of("step", 5, "action", "wait", "state", "networkidle"));
        }
        
        if (lower.contains("teacher")) {
            actions.add(Map.of("step", 6, "action", "click", "selector", "a:has-text('Teacher')", "note", "find teacher link"));
            actions.add(Map.of("step", 7, "action", "wait", "state", "networkidle"));
        }
        
        if (lower.contains("dashboard")) {
            actions.add(Map.of("step", 6, "action", "click", "selector", "a:has-text('Dashboard')", "note", "find dashboard"));
            actions.add(Map.of("step", 7, "action", "wait", "state", "networkidle"));
        }
        
        if (lower.contains("student")) {
            actions.add(Map.of("step", 6, "action", "click", "selector", "a:has-text('Student')", "note", "find student"));
            actions.add(Map.of("step", 7, "action", "wait", "state", "networkidle"));
        }
        
        result.put("actions", actions);
        
        if (run) {
            try {
                String sessionId = mcpService.createSession();
                result.put("sessionId", sessionId);
                
                mcpService.navigate(sessionId, url);
                
                for (Map<String, Object> action : actions) {
                    String act = (String) action.get("action");
                    if ("fill".equals(act)) {
                        mcpService.fill(sessionId, (String) action.get("selector"), (String) action.get("value"));
                    } else if ("click".equals(act)) {
                        try { mcpService.click(sessionId, (String) action.get("selector")); } catch (Exception e) {}
                    } else if ("wait".equals(act)) {
                        mcpService.waitForLoad(sessionId, (String) action.get("state"));
                    }
                }
                
                result.put("executed", true);
                result.put("message", "Actions executed");
            } catch (Exception e) {
                result.put("executed", false);
                result.put("error", e.getMessage());
            }
        } else {
            result.put("message", "Use run=true to execute");
        }
        
        result.put("success", true);
        return ResponseEntity.ok(result);
    }
}