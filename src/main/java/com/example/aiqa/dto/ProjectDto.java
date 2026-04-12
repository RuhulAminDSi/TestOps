package com.example.aiqa.dto;

public class ProjectDto {
    private Long id;
    private String name;
    private String description;
    private String projectType;
    private String status;
    private String createdAt;
    private String updatedAt;
    
    public ProjectDto() {}
    
    public ProjectDto(Long id, String name, String description, String projectType, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.projectType = projectType;
        this.status = status;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getProjectType() {
        return projectType;
    }
    
    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public String getFormattedDate() {
        if (createdAt == null || createdAt.isEmpty()) return "-";
        if (createdAt.length() > 10) {
            String datePart = createdAt.substring(0, 10);
            String timePart = createdAt.length() > 16 ? createdAt.substring(11, 16) : "";
            String[] parts = datePart.split("-");
            if (parts.length == 3) {
                String month = parts[1];
                String day = parts[2];
                String year = parts[0];
                String[] months = {"", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
                int m = 0;
                try { m = Integer.parseInt(month); } catch (Exception e) {}
                month = (m >= 1 && m <= 12) ? months[m] : month;
                return month + " " + day + ", " + year;
            }
        }
        return createdAt;
    }
}