package com.example.aiqa.dto;

import jakarta.validation.constraints.NotBlank;

public class SubdomainRequest {
    @NotBlank(message = "Domain is required")
    private String domain;

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }
}