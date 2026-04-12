package com.example.aiqa.domain;

import java.time.Instant;
import java.util.UUID;

public class Message {
    private UUID id;
    private MessageRole role;
    private String content;
    private Instant createdAt;

    public Message() {}

    public Message(UUID id, MessageRole role, String content, Instant createdAt) {
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
        public Message build() { return new Message(id, role, content, createdAt); }
    }
}
