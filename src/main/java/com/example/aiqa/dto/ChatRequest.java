package com.example.aiqa.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class ChatRequest {
    private UUID chatId;
    @NotBlank(message = "content must not be blank")
    private String content;

    public ChatRequest() {}

    public ChatRequest(UUID chatId, String content) {
        this.chatId = chatId;
        this.content = content;
    }

    public UUID getChatId() {
        return chatId;
    }

    public String getContent() {
        return content;
    }
}
