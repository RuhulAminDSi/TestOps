package com.example.aiqa.service;

import com.example.aiqa.domain.TestSuite;
import java.util.List;
import java.util.Optional;

public interface TestSuiteService {
    List<TestSuite> getAllTestSuites();
    Optional<TestSuite> getTestSuiteById(Long id);
    TestSuite createTestSuite(TestSuite testSuite);
    void deleteTestSuite(Long id);
}
