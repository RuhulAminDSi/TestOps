package com.example.aiqa.dto;

import com.example.aiqa.domain.MessageRole;
import java.time.Instant;
import java.util.UUID;

public class MessageDto {
    private UUID id;
    private MessageRole role;
    private String content;
    private Instant createdAt;

    public MessageDto() {}

    public MessageDto(UUID id, MessageRole role, String content, Instant createdAt) {
        this.id = id;
        this.role = role;
        this.content = content;
        this.createdAt = createdAt;
    }

    public UUID getId() { return id; }
    public MessageRole getRole() { return role; }
    public String getContent() { return content; }
    public Instant getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private UUID id;
        private MessageRole role;
        private String content;
        private Instant createdAt;

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder role(MessageRole r) { this.role = r; return this; }
        public Builder content(String c) { this.content = c; return this; }
        public Builder createdAt(Instant t) { this.createdAt = t; return this; }
        public MessageDto build() { return new MessageDto(id, role, content, createdAt); }
    }
}
