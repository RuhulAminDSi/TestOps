package com.example.aiqa.service;

import com.example.aiqa.dto.TestCaseDto;
import java.util.List;

public interface TestCaseService {
    List<TestCaseDto> getAllTestCases();
    TestCaseDto getTestCaseById(Long id);
    TestCaseDto createTestCase(TestCaseDto testCaseDto);
    TestCaseDto updateTestCase(Long id, TestCaseDto testCaseDto);
    void deleteTestCase(Long id);
}
