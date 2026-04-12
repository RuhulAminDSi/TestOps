package com.example.aiqa.repository;

import com.example.aiqa.domain.Chat;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Repository
public class InMemoryChatRepository implements ChatRepository {

    private final ConcurrentMap<UUID, Chat> storage = new ConcurrentHashMap<>();

    @Override
    public Chat save(Chat chat) {
        storage.put(chat.getId(), chat);
        return chat;
    }

    @Override
    public Optional<Chat> findById(UUID id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public List<Chat> findAll() {
        return new ArrayList<>(storage.values());
    }

    @Override
    public void deleteById(UUID id) {
        storage.remove(id);
    }
}
