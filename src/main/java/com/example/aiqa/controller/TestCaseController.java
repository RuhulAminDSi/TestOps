package com.example.aiqa.controller;

import com.example.aiqa.dto.TestCaseDto;
import com.example.aiqa.service.TestCaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-cases")
public class TestCaseController {
    
    private final TestCaseService testCaseService;
    
    public TestCaseController(TestCaseService testCaseService) {
        this.testCaseService = testCaseService;
    }
    
    @GetMapping
    public ResponseEntity<List<TestCaseDto>> getAllTestCases() {
        return ResponseEntity.ok(testCaseService.getAllTestCases());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TestCaseDto> getTestCaseById(@PathVariable Long id) {
        return ResponseEntity.ok(testCaseService.getTestCaseById(id));
    }
    
    @PostMapping
    public ResponseEntity<TestCaseDto> createTestCase(@RequestBody TestCaseDto testCaseDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(testCaseService.createTestCase(testCaseDto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TestCaseDto> updateTestCase(@PathVariable Long id, @RequestBody TestCaseDto testCaseDto) {
        return ResponseEntity.ok(testCaseService.updateTestCase(id, testCaseDto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestCase(@PathVariable Long id) {
        testCaseService.deleteTestCase(id);
        return ResponseEntity.noContent().build();
    }
}
