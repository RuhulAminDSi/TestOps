package com.example.aiqa.controller;

import com.example.aiqa.domain.Script;
import com.example.aiqa.repository.ScriptRepository;
import com.example.aiqa.service.SandboxExecutionService;
import com.example.aiqa.service.SandboxExecutionService.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/scripts")
@CrossOrigin(origins = "*")
public class ScriptExecutionController {
    
    private final ScriptRepository scriptRepository;
    private final SandboxExecutionService sandboxService;
    
    public ScriptExecutionController(ScriptRepository scriptRepository, 
            SandboxExecutionService sandboxService) {
        this.scriptRepository = scriptRepository;
        this.sandboxService = sandboxService;
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Server is working! Script ID: " + scriptRepository.count());
    }
    
    @PostMapping("/{id}/execute")
    public ResponseEntity<Map<String, Object>> execute(
            @PathVariable Long id,
            @RequestParam(defaultValue = "chromium") String browser,
            @RequestParam(defaultValue = "false") boolean headed) {
        
        Script script = scriptRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Script not found: " + id));
        
        try {
            SandboxExecutionService.SandboxResult result = sandboxService.executeSync(id, browser, headed);
            
            // Convert logs to a serializable list
            java.util.List<Map<String, String>> logsList = new java.util.ArrayList<>();
            for (SandboxExecutionService.LogEntry log : result.logs()) {
                java.util.Map<String, String> logMap = new java.util.HashMap<>();
                logMap.put("type", log.type());
                logMap.put("message", log.message());
                if (log.timestamp() != null) {
                    logMap.put("timestamp", log.timestamp());
                }
                logsList.add(logMap);
            }
            
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("status", result.status());
            response.put("duration", result.executionTime());
            response.put("logs", logsList);
            
            if (result.error() != null) {
                Map<String, Object> errorMap = new java.util.HashMap<>();
                errorMap.put("message", result.error().message());
                if (result.error().line() != null) errorMap.put("line", result.error().line());
                response.put("error", errorMap);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new java.util.HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
