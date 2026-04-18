package com.example.aiqa.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "execution_results")
public class ExecutionResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "script_id")
    private Long scriptId;
    
    @Column(name = "script_name")
    private String scriptName;
    
    @Enumerated(EnumType.STRING)
    private ExecutionStatus status;
    
    @Column(columnDefinition = "TEXT")
    private String output;
    
    @Column(columnDefinition = "TEXT")
    private String errorOutput;
    
    @Column(name = "duration_ms")
    private Long durationMs;
    
    @Column(name = "total_tests")
    private Integer totalTests;
    
    @Column(name = "passed_tests")
    private Integer passedTests;
    
    @Column(name = "failed_tests")
    private Integer failedTests;
    
    @Column(name = "skipped_tests")
    private Integer skippedTests;
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(columnDefinition = "TEXT")
    private String screenshots;
    
    @PrePersist
    protected void onCreate() {
        startedAt = LocalDateTime.now();
    }
    
    public enum ExecutionStatus {
        RUNNING, PASSED, FAILED, TIMEOUT, CANCELLED
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getScriptId() { return scriptId; }
    public void setScriptId(Long scriptId) { this.scriptId = scriptId; }
    
    public String getScriptName() { return scriptName; }
    public void setScriptName(String scriptName) { this.scriptName = scriptName; }
    
    public ExecutionStatus getStatus() { return status; }
    public void setStatus(ExecutionStatus status) { this.status = status; }
    
    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }
    
    public String getErrorOutput() { return errorOutput; }
    public void setErrorOutput(String errorOutput) { this.errorOutput = errorOutput; }
    
    public Long getDurationMs() { return durationMs; }
    public void setDurationMs(Long durationMs) { this.durationMs = durationMs; }
    
    public Integer getTotalTests() { return totalTests; }
    public void setTotalTests(Integer totalTests) { this.totalTests = totalTests; }
    
    public Integer getPassedTests() { return passedTests; }
    public void setPassedTests(Integer passedTests) { this.passedTests = passedTests; }
    
    public Integer getFailedTests() { return failedTests; }
    public void setFailedTests(Integer failedTests) { this.failedTests = failedTests; }
    
    public Integer getSkippedTests() { return skippedTests; }
    public void setSkippedTests(Integer skippedTests) { this.skippedTests = skippedTests; }
    
    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public String getScreenshots() { return screenshots; }
    public void setScreenshots(String screenshots) { this.screenshots = screenshots; }
}