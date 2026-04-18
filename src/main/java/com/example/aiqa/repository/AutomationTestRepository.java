package com.example.aiqa.repository;

import com.example.aiqa.domain.AutomationTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AutomationTestRepository extends JpaRepository<AutomationTest, Long> {
    List<AutomationTest> findByOrderByCreatedAtDesc();
    List<AutomationTest> findByStatusOrderByCreatedAtDesc(AutomationTest.TestStatus status);
    List<AutomationTest> findByUrlOrderByCreatedAtDesc(String url);
}