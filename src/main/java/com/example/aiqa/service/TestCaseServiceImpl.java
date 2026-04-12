package com.example.aiqa.service;

import com.example.aiqa.domain.TestCase;
import com.example.aiqa.domain.TestSuite;
import com.example.aiqa.dto.TestCaseDto;
import com.example.aiqa.repository.TestCaseRepository;
import com.example.aiqa.repository.TestSuiteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TestCaseServiceImpl implements TestCaseService {
    
    private final TestCaseRepository testCaseRepository;
    private final TestSuiteRepository testSuiteRepository;
    
    public TestCaseServiceImpl(TestCaseRepository testCaseRepository, TestSuiteRepository testSuiteRepository) {
        this.testCaseRepository = testCaseRepository;
        this.testSuiteRepository = testSuiteRepository;
    }
    
    @Override
    public List<TestCaseDto> getAllTestCases() {
        return testCaseRepository.findAll().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }
    
    @Override
    public TestCaseDto getTestCaseById(Long id) {
        TestCase testCase = testCaseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("TestCase not found with id: " + id));
        return toDto(testCase);
    }
    
    @Override
    public TestCaseDto createTestCase(TestCaseDto testCaseDto) {
        TestCase testCase = new TestCase();
        
        Long suiteId = testCaseDto.getSuiteId();
        if (suiteId == null) {
            List<TestSuite> suites = testSuiteRepository.findAll();
            if (suites.isEmpty()) {
                TestSuite newSuite = new TestSuite();
                newSuite.setProjectId(1L);
                newSuite.setName("Default Suite");
                newSuite.setDescription("Auto-generated default suite");
                newSuite = testSuiteRepository.save(newSuite);
                suiteId = newSuite.getId();
            } else {
                suiteId = suites.get(0).getId();
            }
        }
        testCase.setSuiteId(suiteId);
        
        testCase.setName(testCaseDto.getName());
        testCase.setDescription(testCaseDto.getDescription());
        testCase.setModule(testCaseDto.getModule());
        testCase.setPriority(testCaseDto.getPriority() != null ? testCaseDto.getPriority() : "Medium");
        testCase.setStatus("Not Run");
        
        TestCase saved = testCaseRepository.save(testCase);
        return toDto(saved);
    }
    
    @Override
    public TestCaseDto updateTestCase(Long id, TestCaseDto testCaseDto) {
        TestCase testCase = testCaseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("TestCase not found with id: " + id));
        
        if (testCaseDto.getSuiteId() != null) {
            testCase.setSuiteId(testCaseDto.getSuiteId());
        }
        testCase.setName(testCaseDto.getName());
        testCase.setDescription(testCaseDto.getDescription());
        testCase.setModule(testCaseDto.getModule());
        if (testCaseDto.getPriority() != null) {
            testCase.setPriority(testCaseDto.getPriority());
        }
        if (testCaseDto.getStatus() != null) {
            testCase.setStatus(testCaseDto.getStatus());
        }
        
        TestCase updated = testCaseRepository.save(testCase);
        return toDto(updated);
    }
    
    @Override
    public void deleteTestCase(Long id) {
        if (!testCaseRepository.existsById(id)) {
            throw new RuntimeException("TestCase not found with id: " + id);
        }
        testCaseRepository.deleteById(id);
    }
    
    private TestCaseDto toDto(TestCase testCase) {
        TestCaseDto dto = new TestCaseDto();
        dto.setId(testCase.getId());
        dto.setSuiteId(testCase.getSuiteId());
        dto.setName(testCase.getName());
        dto.setDescription(testCase.getDescription());
        dto.setModule(testCase.getModule());
        dto.setPriority(testCase.getPriority());
        dto.setStatus(testCase.getStatus());
        
        if (testCase.getCreatedAt() != null) {
            dto.setCreatedAt(testCase.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
        if (testCase.getLastRun() != null) {
            dto.setLastRun(testCase.getLastRun().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }
        
        return dto;
    }
}
