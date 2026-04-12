package com.example.aiqa.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Chat {
    private UUID id;
    private Instant createdAt;
    private List<Message> messages;

    public Chat() {
        this.messages = new ArrayList<>();
    }

    public Chat(UUID id, Instant createdAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.messages = new ArrayList<>();
    }

    public UUID getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public List<Message> getMessages() { return messages; }

    public void setId(UUID id) { this.id = id; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public void setMessages(List<Message> messages) { this.messages = messages; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private UUID id;
        private Instant createdAt;
        private List<Message> messages = new ArrayList<>();

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder createdAt(Instant t) { this.createdAt = t; return this; }
        public Builder messages(List<Message> m) { this.messages = m; return this; }
        public Chat build() {
            Chat chat = new Chat(id, createdAt);
            chat.messages = messages;
            return chat;
        }
    }
}
