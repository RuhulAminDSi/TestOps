package com.example.aiqa.controller;

import com.example.aiqa.dto.ScriptDto;
import com.example.aiqa.service.ScriptService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scripts")
public class ScriptController {
    
    private final ScriptService scriptService;
    
    public ScriptController(ScriptService scriptService) {
        this.scriptService = scriptService;
    }
    
    @GetMapping
    public ResponseEntity<List<ScriptDto>> getAllScripts() {
        return ResponseEntity.ok(scriptService.getAllScripts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScriptDto> getScriptById(@PathVariable Long id) {
        return ResponseEntity.ok(scriptService.getScriptById(id));
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ScriptDto>> getScriptsByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(scriptService.getScriptsByProjectId(projectId));
    }
    
    @PostMapping
    public ResponseEntity<ScriptDto> createScript(@RequestBody ScriptDto scriptDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(scriptService.createScript(scriptDto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ScriptDto> updateScript(@PathVariable Long id, @RequestBody ScriptDto scriptDto) {
        return ResponseEntity.ok(scriptService.updateScript(id, scriptDto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScript(@PathVariable Long id) {
        scriptService.deleteScript(id);
        return ResponseEntity.noContent().build();
    }
}
