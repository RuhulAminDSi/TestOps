package com.example.aiqa.service;

import com.example.aiqa.domain.TestScript;
import com.example.aiqa.domain.ExecutionResult;
import com.example.aiqa.repository.TestScriptRepository;
import com.example.aiqa.repository.ExecutionResultRepository;
import com.example.aiqa.service.ai.AIService;
import com.example.aiqa.service.ai.AIService.PageAnalysis;
import com.example.aiqa.service.ai.AIService.Provider;
import com.example.aiqa.service.ai.OpenAIProviderService;
import com.example.aiqa.service.ai.OpencodeAIProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ScriptGeneratorService {
    
    @Autowired
    private TestScriptRepository scriptRepository;
    
    @Autowired
    private ExecutionResultRepository executionResultRepository;
    
    @Autowired
    private BrowserAutomationService browserService;
    
    @Autowired
    private OpenAIProviderService openaiService;
    
    @Autowired
    private OpencodeAIProviderService opencodeService;
    
    private static final String SCRIPTS_DIR = "scripts";
    
    public TestScript generateScript(String instruction, String url, String username, String password, String aiProvider, boolean analyzePage) throws Exception {
        if (instruction == null || instruction.isBlank()) {
            throw new IllegalArgumentException("Instruction is required");
        }
        if (url == null || url.isBlank()) {
            throw new IllegalArgumentException("URL is required");
        }
        
        AIService.PageAnalysis analysis = null;
        try {
            analysis = browserService.analyzePage(url);
        } catch (Exception e) {
            System.err.println("Page analysis failed: " + e.getMessage());
        }
        
        AIService.Provider provider = AIService.Provider.fromId(aiProvider);
        String scriptContent;
        
        if (provider == AIService.Provider.OPENAI && openaiService.isAvailable(provider)) {
            scriptContent = openaiService.generateTestScript(provider, instruction, url, username, password, analysis);
        } else {
            scriptContent = opencodeService.generateTestScript(provider, instruction, url, username, password, analysis);
        }
        
        String scriptName = generateScriptName(instruction);
        String filePath = saveScript(scriptName, scriptContent);
        
        TestScript script = new TestScript();
        script.setName(scriptName);
        script.setContent(scriptContent);
        script.setUrl(url);
        script.setAiProvider(aiProvider);
        script.setTestInstructions(instruction);
        script.setFilePath(filePath);
        script.setStatus(TestScript.ScriptStatus.GENERATED);
        
        scriptRepository.save(script);
        
        return script;
    }
    
    private String generateScriptName(String instruction) {
        String base = instruction.toLowerCase()
            .replaceAll("[^a-z0-9]+", " ")
            .trim()
            .replace(' ', '-');
        
        if (base.length() > 50) {
            base = base.substring(0, 50);
        }
        
        String timestamp = LocalDateTime.now().toString().replace('T', '-').substring(0, 16);
        return base + "-" + timestamp;
    }
    
    private String saveScript(String name, String content) throws IOException {
        Path dir = Paths.get(SCRIPTS_DIR);
        if (!Files.exists(dir)) {
            Files.createDirectories(dir);
        }
        
        String fileName = name.replace(':', '-').replace('.', '-') + ".spec.ts";
        Path file = dir.resolve(fileName);
        
        Files.writeString(file, content);
        
        return file.toString();
    }
    
    public List<TestScript> getAllScripts() {
        return scriptRepository.findByOrderByCreatedAtDesc();
    }
    
    public TestScript getScript(Long id) {
        return scriptRepository.findById(id).orElse(null);
    }
    
    public void deleteScript(Long id) {
        scriptRepository.deleteById(id);
    }
    
    public TestScript saveScript(TestScript script) {
        return scriptRepository.save(script);
    }
}