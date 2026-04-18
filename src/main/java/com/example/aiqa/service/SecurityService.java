package com.example.aiqa.service;

import com.example.aiqa.dto.*;
import com.example.aiqa.domain.SecurityScan;
import java.util.List;

public interface SecurityService {
    SecurityScan vulnScan(VulnScanRequest request);
    SecurityScan headersCheck(HeadersCheckRequest request);
    SecurityScan portScan(PortScanRequest request);
    SecurityScan sslCheck(SslCheckRequest request);
    SecurityScan passwordCheck(PasswordCheckRequest request);
    SecurityScan jwtAnalyze(JwtAnalyzeRequest request);
    SecurityScan inputTest(InputTestRequest request);
    SecurityScan subdomainFind(SubdomainRequest request);
    List<SecurityScan> getReports();
    List<SecurityScan> getReportsByType(String type);
}