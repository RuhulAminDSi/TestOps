package com.example.aiqa.dto;

public class TestCaseDto {
    private Long id;
    private Long suiteId;
    private String name;
    private String description;
    private String module;
    private String priority;
    private String status;
    private String lastRun;
    private String createdAt;
    
    public TestCaseDto() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getSuiteId() { return suiteId; }
    public void setSuiteId(Long suiteId) { this.suiteId = suiteId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getLastRun() { return lastRun; }
    public void setLastRun(String lastRun) { this.lastRun = lastRun; }
    
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
