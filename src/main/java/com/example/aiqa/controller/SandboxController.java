package com.example.aiqa.controller;

import com.example.aiqa.service.SandboxExecutionService;
import com.example.aiqa.service.SandboxExecutionService.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/sandbox")
@CrossOrigin(origins = "*")
public class SandboxController {
    
    private final SandboxExecutionService sandboxService;
    
    public SandboxController(SandboxExecutionService sandboxService) {
        this.sandboxService = sandboxService;
    }
    
    @PostMapping("/execute/{scriptId}")
    public CompletableFuture<ResponseEntity<Map<String, Object>>> execute(
            @PathVariable Long scriptId,
            @RequestParam(defaultValue = "chromium") String browser,
            @RequestParam(defaultValue = "false") boolean headed) {
        
        return sandboxService.executeAsync(scriptId, browser, headed)
            .thenApply(result -> {
                Map<String, Object> response = Map.of(
                    "status", result.status(),
                    "executionTime", result.executionTime(),
                    "logs", result.logs().stream().map(l -> 
                        Map.of("type", l.type(), "message", l.message(), "timestamp", l.timestamp())
                    ).toList(),
                    "screenshots", result.screenshots(),
                    "video", result.video() != null ? result.video() : ""
                );
                
                if (result.error() != null) {
                    response = Map.of(
                        "status", result.status(),
                        "error", Map.of(
                            "message", result.error().message(),
                            "line", result.error().line() != null ? result.error().line() : "",
                            "stack", result.error().stack() != null ? result.error().stack() : ""
                        ),
                        "executionTime", result.executionTime(),
                        "logs", result.logs().stream().map(l -> 
                            Map.of("type", l.type(), "message", l.message(), "timestamp", l.timestamp())
                        ).toList(),
                        "screenshots", result.screenshots()
                    );
                }
                
                return ResponseEntity.ok(response);
            });
    }
    
    @PostMapping("/execute-script")
    public CompletableFuture<ResponseEntity<Map<String, Object>>> executeScript(
            @RequestBody Map<String, String> request) {
        
        String script = request.get("script");
        String browser = request.getOrDefault("browser", "chromium");
        boolean headed = Boolean.parseBoolean(request.getOrDefault("headed", "false"));
        
        // Create temp script in DB
        // For now, return not implemented
        return CompletableFuture.completedFuture(
            ResponseEntity.status(501).body(Map.of(
                "error", "Direct script execution not implemented. Use /execute/{scriptId}"
            ))
        );
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "healthy",
            "service", "Sandbox Execution Service"
        ));
    }
}
