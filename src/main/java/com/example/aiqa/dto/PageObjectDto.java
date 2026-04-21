package com.example.aiqa.dto;

public class PageObjectDto {
    private Long id;
    private String name;
    private String pageName;
    private String description;
    private String locatorType;
    private String locatorValue;
    private String elementType;
    private String updatedAt;
    
    public PageObjectDto() {}
    
    public PageObjectDto(Long id, String name, String pageName, String description, 
                         String locatorType, String locatorValue, String elementType) {
        this.id = id;
        this.name = name;
        this.pageName = pageName;
        this.description = description;
        this.locatorType = locatorType;
        this.locatorValue = locatorValue;
        this.elementType = elementType;
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
    
    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}