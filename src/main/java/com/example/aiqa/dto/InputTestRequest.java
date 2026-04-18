package com.example.aiqa.dto;

import jakarta.validation.constraints.NotBlank;

public class InputTestRequest {
    @NotBlank(message = "URL is required")
    private String url;

    @NotBlank(message = "Parameter name is required")
    private String paramName;

    private String testType = "basic";

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }
}