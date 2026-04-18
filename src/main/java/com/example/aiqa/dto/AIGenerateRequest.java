package com.example.aiqa.dto;

public class AIGenerateRequest {
    
    private String instruction;
    private String url;
    private String username;
    private String password;
    private String aiProvider = "openai";
    private Boolean autoExecute = true;
    private String browserType = "playwright";
    
    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }
    
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getAiProvider() { return aiProvider; }
    public void setAiProvider(String aiProvider) { this.aiProvider = aiProvider; }
    
    public Boolean getAutoExecute() { return autoExecute; }
    public void setAutoExecute(Boolean autoExecute) { this.autoExecute = autoExecute; }
    
    public String getBrowserType() { return browserType; }
    public void setBrowserType(String browserType) { this.browserType = browserType; }
}