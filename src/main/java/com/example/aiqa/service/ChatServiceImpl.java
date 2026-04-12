package com.example.aiqa.service;

import com.example.aiqa.domain.Chat;
import com.example.aiqa.domain.Message;
import com.example.aiqa.domain.MessageRole;
import com.example.aiqa.dto.ChatRequest;
import com.example.aiqa.dto.ChatResponse;
import com.example.aiqa.dto.MessageDto;
import com.example.aiqa.exception.NotFoundException;
import com.example.aiqa.repository.ChatRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {

    private final ChatRepository repository;

    public ChatServiceImpl(ChatRepository repository) {
        this.repository = repository;
    }

    @Override
    public ChatResponse sendMessage(ChatRequest request) {
        Chat chat = request.getChatId() != null ? repository.findById(request.getChatId())
                .orElseThrow(() -> new NotFoundException("Chat not found: " + request.getChatId()))
                : createNewChat();

        Message userMessage = Message.builder()
                .id(UUID.randomUUID())
                .role(MessageRole.USER)
                .content(request.getContent())
                .createdAt(Instant.now())
                .build();

        Message aiMessage = Message.builder()
                .id(UUID.randomUUID())
                .role(MessageRole.AI)
                .content(mockResponse(request.getContent()))
                .createdAt(Instant.now())
                .build();

        chat.getMessages().add(userMessage);
        chat.getMessages().add(aiMessage);
        repository.save(chat);

        return toResponse(chat);
    }

    @Override
    public List<ChatResponse> getHistory() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Chat::getCreatedAt).reversed())
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteChat(UUID id) {
        if (repository.findById(id).isEmpty()) {
            throw new NotFoundException("Chat not found: " + id);
        }
        repository.deleteById(id);
    }

    private Chat createNewChat() {
        Chat chat = Chat.builder()
                .id(UUID.randomUUID())
                .createdAt(Instant.now())
                .build();
        repository.save(chat);
        return chat;
    }

    private String mockResponse(String prompt) {
        return "(mock) I received: " + prompt;
    }

    private ChatResponse toResponse(Chat chat) {
        List<MessageDto> messages = chat.getMessages().stream()
                .map(m -> MessageDto.builder()
                        .id(m.getId())
                        .role(m.getRole())
                        .content(m.getContent())
                        .createdAt(m.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return ChatResponse.builder()
                .id(chat.getId())
                .createdAt(chat.getCreatedAt())
                .messages(messages)
                .build();
    }
}
