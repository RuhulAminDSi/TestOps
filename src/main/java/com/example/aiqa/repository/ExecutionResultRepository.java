package com.example.aiqa.repository;

import com.example.aiqa.domain.ExecutionResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExecutionResultRepository extends JpaRepository<ExecutionResult, Long> {
    
    List<ExecutionResult> findByOrderByStartedAtDesc();
    
    List<ExecutionResult> findByScriptId(Long scriptId);
    
    List<ExecutionResult> findByStatus(ExecutionResult.ExecutionStatus status);
}