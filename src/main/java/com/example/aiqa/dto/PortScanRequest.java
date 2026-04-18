package com.example.aiqa.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class PortScanRequest {
    @NotBlank(message = "Host is required")
    private String host;

    @Min(1)
    @Max(65535)
    private int startPort = 1;

    @Min(1)
    @Max(65535)
    private int endPort = 1024;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getStartPort() {
        return startPort;
    }

    public void setStartPort(int startPort) {
        this.startPort = startPort;
    }

    public int getEndPort() {
        return endPort;
    }

    public void setEndPort(int endPort) {
        this.endPort = endPort;
    }
}