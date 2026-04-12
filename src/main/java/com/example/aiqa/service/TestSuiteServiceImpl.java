package com.example.aiqa.service;

import com.example.aiqa.domain.TestSuite;
import com.example.aiqa.repository.TestSuiteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TestSuiteServiceImpl implements TestSuiteService {
    
    private final TestSuiteRepository testSuiteRepository;
    
    public TestSuiteServiceImpl(TestSuiteRepository testSuiteRepository) {
        this.testSuiteRepository = testSuiteRepository;
    }
    
    @Override
    public List<TestSuite> getAllTestSuites() {
        return testSuiteRepository.findAll();
    }
    
    @Override
    public Optional<TestSuite> getTestSuiteById(Long id) {
        return testSuiteRepository.findById(id);
    }
    
    @Override
    public TestSuite createTestSuite(TestSuite testSuite) {
        return testSuiteRepository.save(testSuite);
    }
    
    @Override
    public void deleteTestSuite(Long id) {
        testSuiteRepository.deleteById(id);
    }
}
