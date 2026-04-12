package com.example.aiqa.repository;

import com.example.aiqa.domain.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {
    List<Script> findBySuiteId(Long suiteId);
    List<Script> findByProjectId(Long projectId);
}
