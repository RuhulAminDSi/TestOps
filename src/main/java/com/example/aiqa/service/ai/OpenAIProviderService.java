package com.example.aiqa.service.ai;

import com.example.aiqa.service.ai.AIService.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class OpenAIProviderService implements AIService {
    
    @Value("${openai.api.key:}")
    private String openaiApiKey;
    
    @Value("${openai.api.url:https://api.openai.com/v1}")
    private String openaiApiUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    @Override
    public String generateTestScript(Provider provider, String instruction, String url, String username, String password, PageAnalysis pageAnalysis) {
        String systemPrompt = buildSystemPrompt(pageAnalysis);
        String userPrompt = buildUserPrompt(instruction, url, username, password);
        
        return switch (provider) {
            case OPENAI -> callOpenAI(systemPrompt, userPrompt);
            case CLAUDE -> callClaude(systemPrompt, userPrompt);
            case OLLAMA -> callOllama(systemPrompt, userPrompt);
            case OPENCODE -> generateWithOpencode(instruction, url, username, password, pageAnalysis);
            default -> callOpenAI(systemPrompt, userPrompt);
        };
    }
    
    private String buildSystemPrompt(PageAnalysis analysis) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are an expert Playwright test automation engineer. ");
        sb.append("Generate TypeScript test scripts for web applications.\n\n");
        
        if (analysis != null && analysis.elements() != null) {
            sb.append("Page Elements Found:\n");
            for (PageElement el : analysis.elements()) {
                sb.append("- ").append(el.tag())
                  .append(": ").append(el.name());
                if (el.id() != null) sb.append(" (id: ").append(el.id()).append(")");
                if (el.label() != null) sb.append(" [").append(el.label()).append("]");
                sb.append("\n");
            }
        }
        
        sb.append("\nGenerate a complete, runnable Playwright test script in TypeScript.");
        sb.append(" Use locators like page.locator('#id'), page.getByRole(), page.getByLabel().");
        sb.append("\n\nOutput ONLY the TypeScript code without any explanation.");
        
        return sb.toString();
    }
    
    private String buildUserPrompt(String instruction, String url, String username, String password) {
        return String.format("""
            Generate a Playwright test script for: %s
            
            Target URL: %s
            
            Credentials to use:
            - Username: %s
            - Password: %s
            
            The test should:
            1. Navigate to the URL
            2. Perform the described actions
            3. Assert expected results
            
            Output ONLY the TypeScript code without any explanation.
            """, instruction, url, username != null ? username : "N/A", password != null ? password : "N/A");
    }
    
    private String callOpenAI(String system, String user) {
        if (openaiApiKey == null || openaiApiKey.isBlank()) {
            return generateFallbackScript(user);
        }
        
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openaiApiKey);
            
            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-4");
            body.put("max_tokens", 2000);
            body.put("temperature", 0.2);
            
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", system));
            messages.add(Map.of("role", "user", "content", user));
            body.put("messages", messages);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                openaiApiUrl + "/chat/completions", entity, Map.class);
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                return (String) choices.get(0).get("message");
            }
        } catch (Exception e) {
            System.err.println("OpenAI API error: " + e.getMessage());
        }
        
        return generateFallbackScript(user);
    }
    
    private String callClaude(String system, String user) {
        return generateFallbackScript(user);
    }
    
    private String callOllama(String system, String user) {
        return generateFallbackScript(user);
    }
    
    private String generateWithOpencode(String instruction, String url, String username, String password, PageAnalysis analysis) {
        return generateFallbackScript("Instruction: " + instruction + ", URL: " + url + ", Username: " + username + ", Password: " + password);
    }
    
    private String generateFallbackScript(String context) {
        String testName = extractTestName(context);
        String targetUrl = extractUrl(context);
        
        return String.format("""
import { test, expect } from '@playwright/test';

test('%s', async ({ page }) => {
  await page.goto('%s');
  
  // Test implementation based on: %s
  // TODO: Customize test steps based on instruction
  
  await expect(page.locator('body')).toBeVisible();
});
""", testName, targetUrl, shortenContext(context));
    }
    
    private String extractTestName(String text) {
        String lower = text.toLowerCase();
        if (lower.contains("login")) return "user login test";
        if (lower.contains("register")) return "user registration test";
        if (lower.contains("search")) return "search functionality test";
        if (lower.contains("checkout")) return "checkout flow test";
        if (lower.contains("invalid")) return "validation test";
        return "automated test";
    }
    
    private String extractUrl(String text) {
        if (text.contains("http")) {
            int start = text.indexOf("http");
            int end = text.indexOf(" ", start);
            if (end < 0) end = text.length();
            return text.substring(start, Math.min(end, start + 100));
        }
        return "https://example.com";
    }
    
    private String shortenContext(String text) {
        return text.length() > 50 ? text.substring(0, 50) + "..." : text;
    }
    
    @Override
    public boolean isAvailable(Provider provider) {
        return switch (provider) {
            case OPENAI -> openaiApiKey != null && !openaiApiKey.isBlank();
            case OLLAMA, CLAUDE -> false;
            case OPENCODE -> true;
        };
    }
}