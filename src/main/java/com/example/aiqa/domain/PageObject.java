package com.example.aiqa.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "page_objects")
public class PageObject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "page_name", nullable = false)
    private String pageName;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "locator_type")
    private String locatorType;
    
    @Column(name = "locator_value", columnDefinition = "TEXT")
    private String locatorValue;
    
    @Column
    private String elementType;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPageName() { return pageName; }
    public void setPageName(String pageName) { this.pageName = pageName; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getLocatorType() { return locatorType; }
    public void setLocatorType(String locatorType) { this.locatorType = locatorType; }
    
    public String getLocatorValue() { return locatorValue; }
    public void setLocatorValue(String locatorValue) { this.locatorValue = locatorValue; }
    
    public String getElementType() { return elementType; }
    public void setElementType(String elementType) { this.elementType = elementType; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}