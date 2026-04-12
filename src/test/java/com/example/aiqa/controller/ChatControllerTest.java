package com.example.aiqa.controller;

import com.example.aiqa.domain.MessageRole;
import com.example.aiqa.dto.ChatRequest;
import com.example.aiqa.dto.ChatResponse;
import com.example.aiqa.dto.MessageDto;
import com.example.aiqa.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ChatController.class)
class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChatService chatService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void sendMessage_shouldReturn201_whenValidRequest() throws Exception {
        UUID chatId = UUID.randomUUID();
        List<MessageDto> messages = List.of(
                MessageDto.builder()
                        .id(UUID.randomUUID())
                        .role(MessageRole.USER)
                        .content("Hello")
                        .createdAt(Instant.now())
                        .build()
        );
        ChatResponse response = ChatResponse.builder()
                .id(chatId)
                .createdAt(Instant.now())
                .messages(messages)
                .build();

        when(chatService.sendMessage(any(ChatRequest.class))).thenReturn(response);

        ChatRequest request = new ChatRequest(null, "Hello");

        mockMvc.perform(post("/api/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(chatId.toString()));
    }

    @Test
    void sendMessage_shouldReturn400_whenContentBlank() throws Exception {
        ChatRequest request = new ChatRequest(null, "");

        mockMvc.perform(post("/api/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void history_shouldReturn200_withChatList() throws Exception {
        ChatResponse response = ChatResponse.builder()
                .id(UUID.randomUUID())
                .createdAt(Instant.now())
                .messages(List.of())
                .build();

        when(chatService.getHistory()).thenReturn(List.of(response));

        mockMvc.perform(get("/api/chat/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(response.getId().toString()));
    }

    @Test
    void delete_shouldReturn204_whenChatDeleted() throws Exception {
        UUID chatId = UUID.randomUUID();
        
        doNothing().when(chatService).deleteChat(any(UUID.class));

        mockMvc.perform(delete("/api/chat/{id}", chatId))
                .andExpect(status().isNoContent());
    }
}