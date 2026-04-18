package com.example.aiqa.controller;

import com.example.aiqa.service.AutomationEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/automation")
public class AutomationController {
    
    @Autowired
    private AutomationEngineService engineService;
    
    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateScript(
            @RequestParam String url,
            @RequestParam String instruction,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String password) {
        
        String testName = name != null ? name : "test-" + System.currentTimeMillis();
        
        try {
            var result = engineService.analyzeAndGenerate(testName, url, instruction, username, password);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", result.getId());
            response.put("name", result.getName());
            response.put("url", result.getUrl());
            response.put("instruction", result.getInstruction());
            response.put("script", result.getScript());
            response.put("status", result.getStatus().name());
            response.put("logs", result.getLogs());
            response.put("createdAt", result.getCreatedAt());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> getHistory() {
        var tests = engineService.getTestHistory();
        
        List<Map<String, Object>> results = tests.stream().map(t -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", t.getId());
            map.put("name", t.getName());
            map.put("url", t.getUrl());
            map.put("instruction", t.getInstruction());
            map.put("status", t.getStatus().name());
            map.put("createdAt", t.getCreatedAt());
            return map;
        }).toList();
        
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getTest(@PathVariable Long id) {
        var test = engineService.getTest(id);
        
        if (test == null) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", test.getId());
        response.put("name", test.getName());
        response.put("url", test.getUrl());
        response.put("instruction", test.getInstruction());
        response.put("script", test.getScript());
        response.put("status", test.getStatus().name());
        response.put("logs", test.getLogs());
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTest(@PathVariable Long id) {
        try {
            engineService.deleteTest(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Deleted"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
    
    @GetMapping("/scripts/{filename}")
    public ResponseEntity<byte[]> getScriptFile(@PathVariable String filename) {
        try {
            Path scriptPath = Paths.get("automation-scripts", filename);
            if (Files.exists(scriptPath)) {
                byte[] content = Files.readAllBytes(scriptPath);
                return ResponseEntity.ok()
                    .header("Content-Type", "application/typescript")
                    .header("Content-Disposition", "inline")
                    .body(content);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}