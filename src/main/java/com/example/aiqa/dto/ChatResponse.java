package com.example.aiqa.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public class ChatResponse {
    private UUID id;
    private Instant createdAt;
    private List<MessageDto> messages;

    public ChatResponse() {}

    public ChatResponse(UUID id, Instant createdAt, List<MessageDto> messages) {
        this.id = id;
        this.createdAt = createdAt;
        this.messages = messages;
    }

    public UUID getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public List<MessageDto> getMessages() { return messages; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private UUID id;
        private Instant createdAt;
        private List<MessageDto> messages;

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder createdAt(Instant t) { this.createdAt = t; return this; }
        public Builder messages(List<MessageDto> m) { this.messages = m; return this; }
        public ChatResponse build() { return new ChatResponse(id, createdAt, messages); }
    }
}
