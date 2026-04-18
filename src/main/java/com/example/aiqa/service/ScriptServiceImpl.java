package com.example.aiqa.service;

import com.example.aiqa.domain.Script;
import com.example.aiqa.domain.TestSuite;
import com.example.aiqa.dto.ScriptDto;
import com.example.aiqa.repository.ScriptRepository;
import com.example.aiqa.repository.TestSuiteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ScriptServiceImpl implements ScriptService {
    
    private final ScriptRepository scriptRepository;
    private final TestSuiteRepository testSuiteRepository;
    
    public ScriptServiceImpl(ScriptRepository scriptRepository, TestSuiteRepository testSuiteRepository) {
        this.scriptRepository = scriptRepository;
        this.testSuiteRepository = testSuiteRepository;
    }
    
    @Override
    public List<ScriptDto> getAllScripts() {
        return scriptRepository.findAll().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<ScriptDto> getScriptsByProjectId(Long projectId) {
        return scriptRepository.findByProjectId(projectId).stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }
    
    @Override
    public ScriptDto getScriptById(Long id) {
        Script script = scriptRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Script not found with id: " + id));
        return toDto(script);
    }
    
    @Override
    public ScriptDto createScript(ScriptDto scriptDto) {
        Script script = new Script();
        
        Long projectId = scriptDto.getProjectId();
        Long suiteId = scriptDto.getSuiteId();
        
        if (projectId == null) {
            projectId = 1L;
        }
        
        if (suiteId == null) {
            List<TestSuite> suites = testSuiteRepository.findAll();
            if (suites.isEmpty()) {
                TestSuite newSuite = new TestSuite();
                newSuite.setProjectId(projectId);
                newSuite.setName("Default Suite");
                newSuite.setDescription("Auto-generated default suite");
                newSuite = testSuiteRepository.save(newSuite);
                suiteId = newSuite.getId();
            } else {
                suiteId = suites.get(0).getId();
            }
        }
        
        script.setProjectId(projectId);
        script.setSuiteId(suiteId);
        script.setName(scriptDto.getName());
        script.setContent(scriptDto.getContent() != null ? scriptDto.getContent() : getDefaultContent(scriptDto.getName()));
        script.setLanguage(scriptDto.getLanguage() != null ? scriptDto.getLanguage() : "javascript");
        script.setLastStatus("Not Run");
        
        Script saved = scriptRepository.save(script);
        return toDto(saved);
    }
    
    @Override
    public ScriptDto updateScript(Long id, ScriptDto scriptDto) {
        Script script = scriptRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Script not found with id: " + id));
        
        if (scriptDto.getName() != null) {
            script.setName(scriptDto.getName());
        }
        if (scriptDto.getContent() != null) {
            script.setContent(scriptDto.getContent());
        }
        if (scriptDto.getLanguage() != null) {
            script.setLanguage(scriptDto.getLanguage());
        }
        if (scriptDto.getSuiteId() != null) {
            script.setSuiteId(scriptDto.getSuiteId());
        }
        if (scriptDto.getProjectId() != null) {
            script.setProjectId(scriptDto.getProjectId());
        }
        
        Script updated = scriptRepository.save(script);
        return toDto(updated);
    }
    
    @Override
    public void deleteScript(Long id) {
        if (!scriptRepository.existsById(id)) {
            throw new RuntimeException("Script not found with id: " + id);
        }
        scriptRepository.deleteById(id);
    }
    
    private ScriptDto toDto(Script script) {
        ScriptDto dto = new ScriptDto();
        dto.setId(script.getId());
        dto.setSuiteId(script.getSuiteId());
        dto.setProjectId(script.getProjectId());
        dto.setName(script.getName());
        dto.setContent(script.getContent());
        dto.setLanguage(script.getLanguage());
        dto.setLastStatus(script.getLastStatus());
        dto.setExecutionTime(script.getExecutionTime());
        
        if (script.getCreatedAt() != null) {
            dto.setCreatedAt(script.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
        if (script.getLastRun() != null) {
            dto.setLastRun(script.getLastRun().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
        
        return dto;
    }
    
    private String getDefaultContent(String name) {
        String testName = name != null ? name.replace(".spec.js", "").replace("_", " ") : "example test";
        return "import { test, expect } from '@playwright/test';\n\ntest('" + testName + "', async ({ page }) => {\n  // Your test code here\n});";
    }
}
