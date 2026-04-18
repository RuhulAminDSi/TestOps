package com.example.aiqa.service;

import com.example.aiqa.domain.SecurityScan;
import com.example.aiqa.dto.*;
import com.example.aiqa.repository.SecurityScanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SecurityServiceTest {

    @Mock
    private SecurityScanRepository repository;

    private SecurityServiceImpl securityService;

    @BeforeEach
    void setUp() {
        securityService = new SecurityServiceImpl(repository);
    }

    @Test
    void testPasswordCheck_ReturnsResult() {
        PasswordCheckRequest request = new PasswordCheckRequest();
        request.setPassword("TestPassword123!");

        when(repository.save(any(SecurityScan.class))).thenAnswer(inv -> {
            SecurityScan scan = inv.getArgument(0);
            scan.setId(UUID.randomUUID());
            return scan;
        });

        SecurityScan result = securityService.passwordCheck(request);

        assertNotNull(result);
        verify(repository, times(1)).save(any(SecurityScan.class));
    }

    @Test
    void testPasswordCheck_DetectsWeakPassword() {
        PasswordCheckRequest request = new PasswordCheckRequest();
        request.setPassword("123");

        when(repository.save(any(SecurityScan.class))).thenAnswer(inv -> {
            SecurityScan scan = inv.getArgument(0);
            scan.setId(UUID.randomUUID());
            return scan;
        });

        SecurityScan result = securityService.passwordCheck(request);

        assertNotNull(result);
        assertTrue(result.getResult().contains("weak") || 
                  result.getResult().contains("score"));
    }

    @Test
    void testJwtAnalyze_DecodesValidToken() {
        JwtAnalyzeRequest request = new JwtAnalyzeRequest();
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        request.setToken(token);

        when(repository.save(any(SecurityScan.class))).thenAnswer(inv -> {
            SecurityScan scan = inv.getArgument(0);
            scan.setId(UUID.randomUUID());
            return scan;
        });

        SecurityScan result = securityService.jwtAnalyze(request);

        assertNotNull(result);
        assertTrue(result.getResult().contains("header") || 
                  result.getResult().contains("payload"));
    }

    @Test
    void testJwtAnalyze_HandlesInvalidToken() {
        JwtAnalyzeRequest request = new JwtAnalyzeRequest();
        request.setToken("invalid.token.here");

        when(repository.save(any(SecurityScan.class))).thenAnswer(inv -> {
            SecurityScan scan = inv.getArgument(0);
            scan.setId(UUID.randomUUID());
            return scan;
        });

        SecurityScan result = securityService.jwtAnalyze(request);

        assertNotNull(result);
    }

    @Test
    void testGetReports_CallsRepository() {
        securityService.getReports();
        verify(repository, times(1)).findAllByOrderByCreatedAtDesc();
    }

    @Test
    void testGetReportsByType_FiltersByType() {
        securityService.getReportsByType("vuln-scan");
        verify(repository, times(1)).findByTypeOrderByCreatedAtDesc("vuln-scan");
    }
}