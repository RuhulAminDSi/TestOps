package com.example.aiqa.service;

import com.example.aiqa.dto.ChatRequest;
import com.example.aiqa.dto.ChatResponse;

import java.util.List;
import java.util.UUID;

public interface ChatService {
    ChatResponse sendMessage(ChatRequest request);

    List<ChatResponse> getHistory();

    void deleteChat(UUID id);
}
