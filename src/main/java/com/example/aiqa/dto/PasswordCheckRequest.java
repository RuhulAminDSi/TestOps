package com.example.aiqa.dto;

import jakarta.validation.constraints.NotBlank;

public class PasswordCheckRequest {
    @NotBlank(message = "Password is required")
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}