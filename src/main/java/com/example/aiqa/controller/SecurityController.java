package com.example.aiqa.controller;

import com.example.aiqa.dto.*;
import com.example.aiqa.service.SecurityService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    private final SecurityService securityService;

    public SecurityController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @PostMapping("/vuln-scan")
    public ResponseEntity<?> vulnScan(@Valid @RequestBody VulnScanRequest request) {
        return ResponseEntity.ok(securityService.vulnScan(request));
    }

    @PostMapping("/headers")
    public ResponseEntity<?> headersCheck(@Valid @RequestBody HeadersCheckRequest request) {
        return ResponseEntity.ok(securityService.headersCheck(request));
    }

    @PostMapping("/port-scan")
    public ResponseEntity<?> portScan(@Valid @RequestBody PortScanRequest request) {
        return ResponseEntity.ok(securityService.portScan(request));
    }

    @PostMapping("/ssl-check")
    public ResponseEntity<?> sslCheck(@Valid @RequestBody SslCheckRequest request) {
        return ResponseEntity.ok(securityService.sslCheck(request));
    }

    @PostMapping("/password-check")
    public ResponseEntity<?> passwordCheck(@Valid @RequestBody PasswordCheckRequest request) {
        return ResponseEntity.ok(securityService.passwordCheck(request));
    }

    @PostMapping("/jwt-analyze")
    public ResponseEntity<?> jwtAnalyze(@Valid @RequestBody JwtAnalyzeRequest request) {
        return ResponseEntity.ok(securityService.jwtAnalyze(request));
    }

    @PostMapping("/input-test")
    public ResponseEntity<?> inputTest(@Valid @RequestBody InputTestRequest request) {
        return ResponseEntity.ok(securityService.inputTest(request));
    }

    @PostMapping("/subdomain")
    public ResponseEntity<?> subdomainFind(@Valid @RequestBody SubdomainRequest request) {
        return ResponseEntity.ok(securityService.subdomainFind(request));
    }

    @GetMapping("/reports")
    public ResponseEntity<List<?>> reports(@RequestParam(required = false) String type) {
        if (type != null && !type.isEmpty()) {
            return ResponseEntity.ok(securityService.getReportsByType(type));
        }
        return ResponseEntity.ok(securityService.getReports());
    }
}