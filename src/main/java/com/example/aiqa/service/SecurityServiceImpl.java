package com.example.aiqa.service;

import com.example.aiqa.domain.SecurityScan;
import com.example.aiqa.dto.*;
import com.example.aiqa.repository.SecurityScanRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.Pattern;
import java.util.Base64;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;

@Service
public class SecurityServiceImpl implements SecurityService {

    private final SecurityScanRepository repository;
    private final ObjectMapper objectMapper;

    private static final String[] BASIC_XSS_PAYLOADS = {"<script>alert(1)</script>", "<img src=x onerror=alert(1)>", "javascript:alert(1)", "<svg onload=alert(1)>"};
    private static final String[] BASIC_SQLI_PAYLOADS = {"' OR '1'='1", "' OR '1'='1' --", "1' AND '1'='1", "' UNION SELECT NULL--", "' OR 1=1--"};
    private static final Map<String, String> REQUIRED_HEADERS = new HashMap<>();
    private static final String[] SUBDOMAIN_WORDLIST = {"www", "mail", "ftp", "localhost", "webmail", "smtp", "pop", "ns1", "webdisk", "ns2", "cpanel", "whm", "autodiscover", "autoconfig", "m", "imap", "test", "ns", "blog", "pop3", "dev", "www2", "admin", "forum", "news", "v2", "git", "svn", "mysql", "web1", "static", "docs", "beta", "shop", "login", "shell", "git1", "git2", "s3", "s3.amazonaws.com", "wget", "sql", "secure", "server", "ns1.mydomain.com", "ns2.mydomain.com", "vpn", "ns", "mail2", "new", "old", "lists", "support", "help", "store", "cn", "www1", "live", "proxy", "mx", "mx1", "cdn", "stats", "dns", "ns3", "ns4"};

    static {
        REQUIRED_HEADERS.put("Content-Security-Policy", "Content-Security-Policy");
        REQUIRED_HEADERS.put("X-Frame-Options", "X-Frame-Options");
        REQUIRED_HEADERS.put("X-Content-Type-Options", "X-Content-Type-Options");
        REQUIRED_HEADERS.put("Strict-Transport-Security", "Strict-Transport-Security");
        REQUIRED_HEADERS.put("X-XSS-Protection", "X-XSS-Protection");
        REQUIRED_HEADERS.put("Referrer-Policy", "Referrer-Policy");
        REQUIRED_HEADERS.put("Permissions-Policy", "Permissions-Policy");
    }

    public SecurityServiceImpl(SecurityScanRepository repository) {
        this.repository = repository;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public SecurityScan vulnScan(VulnScanRequest request) {
        String url = request.getUrl();
        List<Map<String, Object>> vulnerabilities = new ArrayList<>();

        try {
            if (!url.startsWith("http")) {
                url = "http://" + url;
            }
            URL targetUrl = new URL(url);

            Map<String, Object> missingHeaders = checkMissingHeaders(targetUrl);
            if (!missingHeaders.isEmpty()) {
                vulnerabilities.add(Map.of("type", "Missing Security Headers", "severity", "medium", "details", missingHeaders));
            }

            Map<String, Object> xssResult = checkBasicXSS(targetUrl);
            Boolean xssVulnerable = (Boolean) xssResult.get("vulnerable");
            if (xssVulnerable != null && xssVulnerable) {
                vulnerabilities.add(Map.of("type", "Potential XSS", "severity", "high", "details", xssResult.get("details")));
            }

            Map<String, Object> sqliResult = checkBasicSQLi(targetUrl);
            Boolean sqliVulnerable = (Boolean) sqliResult.get("vulnerable");
            if (sqliVulnerable != null && sqliVulnerable) {
                vulnerabilities.add(Map.of("type", "Potential SQL Injection", "severity", "critical", "details", sqliResult.get("details")));
            }

        } catch (Exception e) {
            vulnerabilities.add(Map.of("type", "Scan Error", "severity", "info", "message", e.getMessage()));
        }

        String result = writeJson(vulnerabilities);
        SecurityScan scan = new SecurityScan();
        scan.setType("vuln-scan");
        scan.setTarget(url);
        scan.setResult(result);
        return repository.save(scan);
    }

    private Map<String, Object> checkMissingHeaders(URL url) {
        Map<String, Object> missing = new HashMap<>();
        try {
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            conn.setRequestMethod("HEAD");
            conn.getResponseCode();

            for (Map.Entry<String, String> entry : REQUIRED_HEADERS.entrySet()) {
                String header = conn.getHeaderField(entry.getValue());
                if (header == null || header.isEmpty()) {
                    missing.put(entry.getValue(), "Missing");
                }
            }
            conn.disconnect();
        } catch (Exception ignored) {}
        return missing;
    }

    private Map<String, Object> checkBasicXSS(URL url) {
        Map<String, Object> result = new HashMap<>();
        try {
            String query = url.getQuery();
            String testUrl = url.toString().replace((query != null ? "?" + query : ""), "") + (query != null ? "&" : "?") + "q=<script>alert(1)</script>";
            URL testUrlObj = new URL(testUrl);
            HttpURLConnection conn = (HttpURLConnection) testUrlObj.openConnection();
            conn.setConnectTimeout(3000);
            conn.setReadTimeout(3000);
            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();
            conn.disconnect();

            String resp = response.toString();
            boolean vulnerable = resp.contains("<script>alert(1)</script>") || resp.contains("alert(1)");
            result.put("vulnerable", vulnerable);
            if (vulnerable) {
                result.put("details", "Reflected XSS payload in response");
            }
        } catch (Exception e) {
            result.put("vulnerable", false);
            result.put("details", e.getMessage());
        }
        return result;
    }

    private Map<String, Object> checkBasicSQLi(URL url) {
        Map<String, Object> result = new HashMap<>();
        try {
            String query = url.getQuery();
            String testUrl = url.toString().replace((query != null ? "?" + query : ""), "") + (query != null ? "&" : "?") + "q=' OR '1'='1";
            URL testUrlObj = new URL(testUrl);
            HttpURLConnection conn = (HttpURLConnection) testUrlObj.openConnection();
            conn.setConnectTimeout(3000);
            conn.setReadTimeout(3000);
            int code = conn.getResponseCode();
            conn.disconnect();

            boolean vulnerable = code >= 500 || code == 403 || code == 401;
            result.put("vulnerable", vulnerable);
            if (vulnerable) {
                result.put("details", "Possible SQL error in response (status " + code + ")");
            }
        } catch (Exception e) {
            result.put("vulnerable", false);
            result.put("details", e.getMessage());
        }
        return result;
    }

    @Override
    public SecurityScan headersCheck(HeadersCheckRequest request) {
        String url = request.getUrl();
        Map<String, Object> results = new HashMap<>();

        try {
            if (!url.startsWith("http")) {
                url = "http://" + url;
            }
            URL targetUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) targetUrl.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            conn.setRequestMethod("HEAD");
            conn.getResponseCode();

            for (Map.Entry<String, String> entry : REQUIRED_HEADERS.entrySet()) {
                String header = conn.getHeaderField(entry.getValue());
                if (header != null && !header.isEmpty()) {
                    results.put(entry.getValue(), Map.of("status", "present", "value", header));
                } else {
                    results.put(entry.getValue(), Map.of("status", "missing"));
                }
            }

            results.put("allheaders", conn.getHeaderFields());
            conn.disconnect();

        } catch (Exception e) {
            results.put("error", e.getMessage());
        }

        String result = writeJson(results);
        SecurityScan scan = new SecurityScan();
        scan.setType("headers-check");
        scan.setTarget(url);
        scan.setResult(result);
        return repository.save(scan);
    }

    @Override
    public SecurityScan portScan(PortScanRequest request) {
        String host = request.getHost();
        int startPort = Math.max(1, request.getStartPort());
        int endPort = Math.min(65535, request.getEndPort());
        Map<String, Object> results = new HashMap<>();
        List<Integer> openPorts = new ArrayList<>();

        ExecutorService executor = Executors.newFixedThreadPool(50);
        List<Callable<Boolean>> tasks = new ArrayList<>();

        for (int port = startPort; port <= endPort; port++) {
            final int p = port;
            tasks.add(() -> isPortOpen(host, p));
        }

        try {
            List<Future<Boolean>> futures = executor.invokeAll(tasks);
            for (int i = 0; i < futures.size(); i++) {
                if (futures.get(i).get()) {
                    openPorts.add(startPort + i);
                }
            }
        } catch (Exception ignored) {}

        executor.shutdown();
        results.put("host", host);
        results.put("startPort", startPort);
        results.put("endPort", endPort);
        results.put("openPorts", openPorts);
        results.put("openPortCount", openPorts.size());

        String result = writeJson(results);
        SecurityScan scan = new SecurityScan();
        scan.setType("port-scan");
        scan.setTarget(host + ":" + startPort + "-" + endPort);
        scan.setResult(result);
        return repository.save(scan);
    }

    private boolean isPortOpen(String host, int port) {
        try {
            InetAddress address = InetAddress.getByName(host);
            return address.isReachable(1000);
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public SecurityScan sslCheck(SslCheckRequest request) {
        String url = request.getUrl();
        Map<String, Object> results = new HashMap<>();

        try {
            if (!url.startsWith("https")) {
                url = "https://" + url;
            }
            URL targetUrl = new URL(url);
            HttpsURLConnection conn = (HttpsURLConnection) targetUrl.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            conn.connect();

            java.security.cert.Certificate[] certs = conn.getServerCertificates();
            if (certs.length > 0 && certs[0] instanceof java.security.cert.X509Certificate) {
                java.security.cert.X509Certificate cert = (java.security.cert.X509Certificate) certs[0];
                results.put("subject", cert.getSubjectX500Principal().getName());
                results.put("issuer", cert.getIssuerX500Principal().getName());
                results.put("validFrom", cert.getNotBefore().toString());
                results.put("validTo", cert.getNotAfter().toString());
                results.put("serialNumber", cert.getSerialNumber().toString());

                Date now = new Date();
                boolean expired = now.after(cert.getNotAfter());
                boolean notYetValid = now.before(cert.getNotBefore());
                results.put("status", expired ? "expired" : (notYetValid ? "not-yet-valid" : "valid"));
            }

            conn.disconnect();

        } catch (Exception e) {
            results.put("error", e.getMessage());
        }

        String result = writeJson(results);
        SecurityScan scan = new SecurityScan();
        scan.setType("ssl-check");
        scan.setTarget(url);
        scan.setResult(result);
        return repository.save(scan);
    }

    @Override
    public SecurityScan passwordCheck(PasswordCheckRequest request) {
        String password = request.getPassword();
        Map<String, Object> results = new HashMap<>();

        int score = 0;
        List<String> feedback = new ArrayList<>();

        if (password.length() >= 8) {
            score += 1;
        } else {
            feedback.add("Password should be at least 8 characters");
        }

        if (password.length() >= 12) {
            score += 1;
        }

        boolean hasUpper = !password.equals(password.toLowerCase());
        boolean hasLower = !password.equals(password.toUpperCase());
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecial = password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*");

        if (hasUpper) score += 1;
        else feedback.add("Add uppercase letters");

        if (hasLower) score += 1;
        else feedback.add("Add lowercase letters");

        if (hasDigit) score += 1;
        else feedback.add("Add numbers");

        if (hasSpecial) score += 1;
        else feedback.add("Add special characters (!@#$%^&*)");

        if (Pattern.compile("(.)\\1{2,}").matcher(password).find()) {
            score -= 1;
            feedback.add("Avoid repeating characters");
        }

        String[] common = {"password", "123456", "qwerty", "abc123", "letmein", "welcome", "admin", "login"};
        for (String c : common) {
            if (password.toLowerCase().contains(c)) {
                score -= 2;
                feedback.add("Avoid common words");
                break;
            }
        }

        double entropy = calculateEntropy(password);
        results.put("entropy", String.format("%.2f", entropy));

        results.put("score", Math.max(0, score));
        results.put("maxScore", 8);
        results.put("strength", score >= 6 ? "strong" : (score >= 4 ? "medium" : "weak"));
        results.put("feedback", feedback);

        String result = writeJson(results);
        SecurityScan scan = new SecurityScan();
        scan.setType("password-check");
        scan.setTarget("password_length_" + password.length());
        scan.setResult(result);
        return repository.save(scan);
    }

    private double calculateEntropy(String password) {
        int charsetSize = 0;
        if (password.matches(".*[a-z].*")) charsetSize += 26;
        if (password.matches(".*[A-Z].*")) charsetSize += 26;
        if (password.matches(".*\\d.*")) charsetSize += 10;
        if (password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) charsetSize += 32;
        return charsetSize > 0 ? password.length() * Math.log(charsetSize) / Math.log(2) : 0;
    }

    @Override
    public SecurityScan jwtAnalyze(JwtAnalyzeRequest request) {
        String token = request.getToken();
        Map<String, Object> results = new HashMap<>();

        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                results.put("error", "Invalid JWT format");
            } else {
                String header = decodeBase64Url(parts[0]);
                String payload = decodeBase64Url(parts[1]);
                String signature = parts[2];

                results.put("header", parseJson(header));
                results.put("payload", parseJson(payload));
                results.put("signature", signature);

                Map<String, Object> payloadMap = parseJson(payload);
                if (payloadMap.containsKey("exp")) {
                    long exp = ((Number) payloadMap.get("exp")).longValue();
                    results.put("expiry", new Date(exp * 1000).toString());
                    results.put("expired", System.currentTimeMillis() > exp * 1000);
                }
                if (payloadMap.containsKey("iat")) {
                    long iat = ((Number) payloadMap.get("iat")).longValue();
                    results.put("issuedAt", new Date(iat * 1000).toString());
                }
            }
        } catch (Exception e) {
            results.put("error", e.getMessage());
        }

        String result = writeJson(results);
        SecurityScan scan = new SecurityScan();
        scan.setType("jwt-analyze");
        scan.setTarget("token_sample");
        scan.setResult(result);
        return repository.save(scan);
    }

    private String decodeBase64Url(String input) {
        String base64 = input.replace('-', '+').replace('_', '/');
        switch (base64.length() % 4) {
            case 2: base64 += "=="; break;
            case 3: base64 += "="; break;
        }
        byte[] decoded = Base64.getDecoder().decode(base64);
        return new String(decoded);
    }

    @Override
    public SecurityScan inputTest(InputTestRequest request) {
        String url = request.getUrl();
        String paramName = request.getParamName();
        Map<String, Object> results = new HashMap<>();
        List<Map<String, String>> findings = new ArrayList<>();

        try {
            String[] payloads = request.getTestType().equals("xss") ? BASIC_XSS_PAYLOADS :
                            request.getTestType().equals("sqli") ? BASIC_SQLI_PAYLOADS :
                            new String[] {"<script>alert(1)</script>", "' OR '1'='1", "../../../etc/passwd", "{{7*7}}"};

            for (String payload : payloads) {
                String separator = url.contains("?") ? "&" : "?";
                String testUrl = url + separator + paramName + "=" + URLEncoder.encode(payload, "UTF-8");
                try {
                    URL testUrlObj = new URL(testUrl);
                    HttpURLConnection conn = (HttpURLConnection) testUrlObj.openConnection();
                    conn.setConnectTimeout(3000);
                    conn.setReadTimeout(3000);
                    conn.setRequestMethod("GET");
                    int code = conn.getResponseCode();
                    
                    BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getErrorStream() != null ? conn.getErrorStream() : conn.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    reader.close();
                    conn.disconnect();

                    String responseStr = response.toString();
                    boolean reflected = responseStr.contains(payload);
                    boolean error = code >= 400 || responseStr.toLowerCase().contains("error") || responseStr.toLowerCase().contains("sql");

                    if (reflected) {
                        findings.add(Map.of("payload", payload, "type", "Reflected", "severity", "medium"));
                    }
                    if (error && !reflected) {
                        findings.add(Map.of("payload", payload, "type", "Error Triggered", "severity", "low"));
                    }
                } catch (Exception e) {
                    findings.add(Map.of("payload", payload, "type", "Exception", "message", e.getMessage()));
                }
            }

            results.put("findings", findings);
            results.put("summary", findings.size() + " potential issue(s) found");

        } catch (Exception e) {
            results.put("error", e.getMessage());
        }

        String result = writeJson(results);
        SecurityScan scan = new SecurityScan();
        scan.setType("input-test");
        scan.setTarget(url);
        scan.setResult(result);
        return repository.save(scan);
    }

    @Override
    public SecurityScan subdomainFind(SubdomainRequest request) {
        String domain = request.getDomain();
        Map<String, Object> results = new HashMap<>();
        List<String> foundSubdomains = new ArrayList<>();

        for (String subdomain : SUBDOMAIN_WORDLIST) {
            String fullDomain = subdomain + "." + domain;
            try {
                InetAddress[] addresses = InetAddress.getAllByName(fullDomain);
                if (addresses.length > 0) {
                    foundSubdomains.add(fullDomain + " -> " + addresses[0].getHostAddress());
                }
            } catch (Exception ignored) {}
        }

        results.put("baseDomain", domain);
        results.put("foundSubdomains", foundSubdomains);
        results.put("count", foundSubdomains.size());

        String result = writeJson(results);
        SecurityScan scan = new SecurityScan();
        scan.setType("subdomain");
        scan.setTarget(domain);
        scan.setResult(result);
        return repository.save(scan);
    }

    @Override
    public List<SecurityScan> getReports() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public List<SecurityScan> getReportsByType(String type) {
        return repository.findByTypeOrderByCreatedAtDesc(type);
    }

    private String writeJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "{\"error\":\"" + e.getMessage() + "\"}";
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> parseJson(String json) {
        try {
            return objectMapper.readValue(json, Map.class);
        } catch (Exception e) {
            return Map.of("parse-error", e.getMessage());
        }
    }
}