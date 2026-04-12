package com.example.aiqa.service;

import com.example.aiqa.domain.Chat;
import com.example.aiqa.domain.MessageRole;
import com.example.aiqa.dto.ChatRequest;
import com.example.aiqa.dto.ChatResponse;
import com.example.aiqa.exception.NotFoundException;
import com.example.aiqa.repository.ChatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChatServiceTest {

    @Mock
    private ChatRepository repository;

    private ChatService chatService;

    @BeforeEach
    void setUp() {
        chatService = new ChatServiceImpl(repository);
    }

    @Test
    void sendMessage_shouldCreateNewChat_whenChatIdIsNull() {
        ChatRequest request = new ChatRequest(null, "Hello");
        Chat savedChat = Chat.builder()
                .id(UUID.randomUUID())
                .createdAt(Instant.now())
                .build();

        when(repository.save(any(Chat.class))).thenReturn(savedChat);

        ChatResponse response = chatService.sendMessage(request);

        assertNotNull(response);
        assertNotNull(response.getId());
        verify(repository, times(2)).save(any(Chat.class));
    }

    @Test
    void sendMessage_shouldReturnTwoMessages_whenMessageSent() {
        Chat existingChat = Chat.builder()
                .id(UUID.randomUUID())
                .createdAt(Instant.now())
                .build();
        ChatRequest request = new ChatRequest(existingChat.getId(), "Hi");

        when(repository.findById(existingChat.getId())).thenReturn(Optional.of(existingChat));
        when(repository.save(any(Chat.class))).thenReturn(existingChat);

        ChatResponse response = chatService.sendMessage(request);

        assertNotNull(response);
        assertEquals(2, response.getMessages().size());
    }

    @Test
    void sendMessage_shouldThrowNotFoundException_whenChatNotFound() {
        UUID chatId = UUID.randomUUID();
        ChatRequest request = new ChatRequest(chatId, "Hello");

        when(repository.findById(chatId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> chatService.sendMessage(request));
    }

    @Test
    void getHistory_shouldReturnChatsSortedByCreatedAtDesc() {
        Chat chat1 = Chat.builder()
                .id(UUID.randomUUID())
                .createdAt(Instant.now().minusSeconds(100))
                .build();
        Chat chat2 = Chat.builder()
                .id(UUID.randomUUID())
                .createdAt(Instant.now())
                .build();

        when(repository.findAll()).thenReturn(List.of(chat1, chat2));

        List<ChatResponse> history = chatService.getHistory();

        assertEquals(2, history.size());
        assertTrue(history.get(0).getCreatedAt().isAfter(history.get(1).getCreatedAt()));
    }

    @Test
    void deleteChat_shouldCallRepositoryDelete() {
        UUID chatId = UUID.randomUUID();
        Chat chat = Chat.builder().id(chatId).createdAt(Instant.now()).build();

        when(repository.findById(chatId)).thenReturn(Optional.of(chat));

        chatService.deleteChat(chatId);

        verify(repository).deleteById(chatId);
    }

    @Test
    void deleteChat_shouldThrowNotFoundException_whenChatNotFound() {
        UUID chatId = UUID.randomUUID();

        when(repository.findById(chatId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> chatService.deleteChat(chatId));
    }
}