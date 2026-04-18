package com.example.aiqa.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "automation_tests")
public class AutomationTest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String url;
    
    @Column(columnDefinition = "TEXT")
    private String instruction;
    
    @Column(columnDefinition = "TEXT")
    private String script;
    
    @Column(columnDefinition = "TEXT")
    private String logs;
    
    private String screenshotPath;
    
    @Enumerated(EnumType.STRING)
    private TestStatus status;
    
    @Column(columnDefinition = "TEXT")
    private String resultJson;
    
    private LocalDateTime createdAt;
    private LocalDateTime executedAt;
    private Long durationMs;
    
    public enum TestStatus {
        PENDING, RUNNING, PASSED, FAILED, TIMEOUT, ERROR
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        status = TestStatus.PENDING;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    
    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }
    
    public String getScript() { return script; }
    public void setScript(String script) { this.script = script; }
    
    public String getLogs() { return logs; }
    public void setLogs(String logs) { this.logs = logs; }
    
    public String getScreenshotPath() { return screenshotPath; }
    public void setScreenshotPath(String screenshotPath) { this.screenshotPath = screenshotPath; }
    
    public TestStatus getStatus() { return status; }
    public void setStatus(TestStatus status) { this.status = status; }
    
    public String getResultJson() { return resultJson; }
    public void setResultJson(String resultJson) { this.resultJson = resultJson; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getExecutedAt() { return executedAt; }
    public void setExecutedAt(LocalDateTime executedAt) { this.executedAt = executedAt; }
    
    public Long getDurationMs() { return durationMs; }
    public void setDurationMs(Long durationMs) { this.durationMs = durationMs; }
}