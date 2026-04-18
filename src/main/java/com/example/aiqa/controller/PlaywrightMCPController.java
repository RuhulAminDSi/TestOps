package com.example.aiqa.controller;

import com.example.aiqa.service.PlaywrightMCPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mcp")
public class PlaywrightMCPController {
    
    @Autowired
    private PlaywrightMCPService mcpService;
    
    @PostMapping("/session")
    public ResponseEntity<Map<String, Object>> createSession() {
        String sessionId = mcpService.createSession();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "sessionId", sessionId,
            "message", "Session created"
        ));
    }
    
    @PostMapping("/{sessionId}/navigate")
    public ResponseEntity<Map<String, Object>> navigate(
            @PathVariable String sessionId,
            @RequestParam String url) {
        return ResponseEntity.ok(mcpService.navigate(sessionId, url));
    }
    
    @PostMapping("/{sessionId}/fill")
    public ResponseEntity<Map<String, Object>> fill(
            @PathVariable String sessionId,
            @RequestParam String selector,
            @RequestParam String value) {
        return ResponseEntity.ok(mcpService.fill(sessionId, selector, value));
    }
    
    @PostMapping("/{sessionId}/click")
    public ResponseEntity<Map<String, Object>> click(
            @PathVariable String sessionId,
            @RequestParam String selector) {
        return ResponseEntity.ok(mcpService.click(sessionId, selector));
    }
    
    @PostMapping("/{sessionId}/type")
    public ResponseEntity<Map<String, Object>> type(
            @PathVariable String sessionId,
            @RequestParam String selector,
            @RequestParam String text,
            @RequestParam(required = false) Integer delay) {
        return ResponseEntity.ok(mcpService.type(sessionId, selector, text, delay));
    }
    
    @PostMapping("/{sessionId}/select")
    public ResponseEntity<Map<String, Object>> select(
            @PathVariable String sessionId,
            @RequestParam String selector,
            @RequestParam String value) {
        return ResponseEntity.ok(mcpService.selectOption(sessionId, selector, value));
    }
    
    @PostMapping("/{sessionId}/gettext")
    public ResponseEntity<Map<String, Object>> getText(
            @PathVariable String sessionId,
            @RequestParam String selector) {
        return ResponseEntity.ok(mcpService.getText(sessionId, selector));
    }
    
    @PostMapping("/{sessionId}/visible")
    public ResponseEntity<Map<String, Object>> isVisible(
            @PathVariable String sessionId,
            @RequestParam String selector) {
        return ResponseEntity.ok(mcpService.isVisible(sessionId, selector));
    }
    
    @PostMapping("/{sessionId}/screenshot")
    public ResponseEntity<Map<String, Object>> screenshot(
            @PathVariable String sessionId,
            @RequestParam(required = false) String filename) {
        return ResponseEntity.ok(mcpService.screenshot(sessionId, filename));
    }
    
    @PostMapping("/{sessionId}/wait")
    public ResponseEntity<Map<String, Object>> waitForSelector(
            @PathVariable String sessionId,
            @RequestParam String selector,
            @RequestParam(required = false) Integer timeout) {
        return ResponseEntity.ok(mcpService.waitForSelector(sessionId, selector, timeout));
    }
    
    @PostMapping("/{sessionId}/waitload")
    public ResponseEntity<Map<String, Object>> waitForLoad(
            @PathVariable String sessionId,
            @RequestParam(required = false) String state) {
        return ResponseEntity.ok(mcpService.waitForLoad(sessionId, state));
    }
    
    @PostMapping("/{sessionId}/eval")
    public ResponseEntity<Map<String, Object>> evaluate(
            @PathVariable String sessionId,
            @RequestParam String script) {
        return ResponseEntity.ok(mcpService.evaluate(sessionId, script));
    }
    
    @PostMapping("/{sessionId}/action")
    public ResponseEntity<Map<String, Object>> runAction(
            @PathVariable String sessionId,
            @RequestParam String action,
            @RequestParam(required = false) String selector,
            @RequestParam(required = false) String value,
            @RequestParam(required = false) String text,
            @RequestParam(required = false) String url) {
        Map<String, Object> params = new java.util.HashMap<>();
        if (selector != null) params.put("selector", selector);
        if (value != null) params.put("value", value);
        if (text != null) params.put("text", text);
        if (url != null) params.put("url", url);
        return ResponseEntity.ok(mcpService.runAction(sessionId, action, params));
    }
    
    @DeleteMapping("/{sessionId}")
    public ResponseEntity<Map<String, Object>> closeSession(@PathVariable String sessionId) {
        return ResponseEntity.ok(mcpService.closeSession(sessionId));
    }
    
    @GetMapping("/sessions")
    public ResponseEntity<List<String>> getSessions() {
        return ResponseEntity.ok(mcpService.getActiveSessions());
    }
    
    @PostMapping("/execute")
    public ResponseEntity<Map<String, Object>> execute(
            @RequestParam String url,
            @RequestParam String instruction,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String password) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            String sessionId = mcpService.createSession();
            result.put("sessionId", sessionId);
            
            mcpService.navigate(sessionId, url);
            
            String lower = instruction.toLowerCase();
            
            if (lower.contains("login") || lower.contains("signin")) {
                if (username != null && !username.isBlank()) {
                    mcpService.fill(sessionId, "input[name='username']", username);
                }
                if (password != null && !password.isBlank()) {
                    mcpService.fill(sessionId, "input[name='password']", password);
                }
                mcpService.click(sessionId, "button[type='submit']");
                mcpService.waitForLoad(sessionId, "networkidle");
            }
            
            if (lower.contains("teacher")) {
                mcpService.click(sessionId, "a:has-text('Teacher'), link:has-text('Teacher')");
                mcpService.waitForLoad(sessionId, "networkidle");
            }
            
            if (lower.contains("dashboard")) {
                mcpService.click(sessionId, "a:has-text('Dashboard'), link:has-text('Dashboard')");
                mcpService.waitForLoad(sessionId, "networkidle");
            }
            
            Map<String, Object> pageInfo = new HashMap<>();
            pageInfo.put("url", url);
            pageInfo.put("instruction", instruction);
            pageInfo.put("completed", true);
            result.put("success", true);
            result.put("pageInfo", pageInfo);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
}