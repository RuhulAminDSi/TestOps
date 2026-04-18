package com.example.aiqa.controller;

import com.example.aiqa.domain.TestSuite;
import com.example.aiqa.service.TestSuiteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-suites")
public class TestSuiteController {

    private final TestSuiteService testSuiteService;

    public TestSuiteController(TestSuiteService testSuiteService) {
        this.testSuiteService = testSuiteService;
    }

    @GetMapping
    public List<TestSuite> getAllTestSuites() {
        return testSuiteService.getAllTestSuites();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestSuite> getTestSuiteById(@PathVariable Long id) {
        return testSuiteService.getTestSuiteById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TestSuite createTestSuite(@RequestBody TestSuite testSuite) {
        return testSuiteService.createTestSuite(testSuite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestSuite> updateTestSuite(@PathVariable Long id, @RequestBody TestSuite testSuite) {
        return testSuiteService.getTestSuiteById(id)
            .map(existing -> {
                existing.setName(testSuite.getName());
                existing.setDescription(testSuite.getDescription());
                TestSuite updated = testSuiteService.createTestSuite(existing);
                return ResponseEntity.ok(updated);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestSuite(@PathVariable Long id) {
        testSuiteService.deleteTestSuite(id);
        return ResponseEntity.noContent().build();
    }
}