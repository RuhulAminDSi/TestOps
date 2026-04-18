package com.example.aiqa.dto;

import java.time.LocalDateTime;

public class AIGenerateResponse {
    
    private Long scriptId;
    private String scriptName;
    private String filePath;
    private String scriptContent;
    private String status;
    private LocalDateTime createdAt;
    
    private Long executionId;
    private String executionStatus;
    private String output;
    private Integer passedTests;
    private Integer failedTests;
    private Long durationMs;
    
    private String message;
    private Boolean success;
    
    public static AIGenerateResponse success(String message) {
        AIGenerateResponse response = new AIGenerateResponse();
        response.setSuccess(true);
        response.setMessage(message);
        return response;
    }
    
    public static AIGenerateResponse error(String message) {
        AIGenerateResponse response = new AIGenerateResponse();
        response.setSuccess(false);
        response.setMessage(message);
        return response;
    }
    
    public Long getScriptId() { return scriptId; }
    public void setScriptId(Long scriptId) { this.scriptId = scriptId; }
    
    public String getScriptName() { return scriptName; }
    public void setScriptName(String scriptName) { this.scriptName = scriptName; }
    
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    
    public String getScriptContent() { return scriptContent; }
    public void setScriptContent(String scriptContent) { this.scriptContent = scriptContent; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Long getExecutionId() { return executionId; }
    public void setExecutionId(Long executionId) { this.executionId = executionId; }
    
    public String getExecutionStatus() { return executionStatus; }
    public void setExecutionStatus(String executionStatus) { this.executionStatus = executionStatus; }
    
    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }
    
    public Integer getPassedTests() { return passedTests; }
    public void setPassedTests(Integer passedTests) { this.passedTests = passedTests; }
    
    public Integer getFailedTests() { return failedTests; }
    public void setFailedTests(Integer failedTests) { this.failedTests = failedTests; }
    
    public Long getDurationMs() { return durationMs; }
    public void setDurationMs(Long durationMs) { this.durationMs = durationMs; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public Boolean getSuccess() { return success; }
    public void setSuccess(Boolean success) { this.success = success; }
}