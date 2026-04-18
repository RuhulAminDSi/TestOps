package com.example.aiqa.repository;

import com.example.aiqa.domain.TestScript;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestScriptRepository extends JpaRepository<TestScript, Long> {
    
    List<TestScript> findByOrderByCreatedAtDesc();
    
    List<TestScript> findByAiProvider(String aiProvider);
    
    List<TestScript> findByStatus(TestScript.ScriptStatus status);
}