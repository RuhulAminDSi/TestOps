package com.example.aiqa.controller;

import com.example.aiqa.domain.TestSuite;
import com.example.aiqa.dto.ProjectDto;
import com.example.aiqa.dto.ScriptDto;
import com.example.aiqa.dto.TestCaseDto;
import com.example.aiqa.service.ProjectService;
import com.example.aiqa.service.ScriptService;
import com.example.aiqa.service.TestCaseService;
import com.example.aiqa.service.TestSuiteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class ViewController {

    private final ProjectService projectService;
    private final TestCaseService testCaseService;
    private final TestSuiteService testSuiteService;
    private final ScriptService scriptService;

    public ViewController(ProjectService projectService, TestCaseService testCaseService, TestSuiteService testSuiteService, ScriptService scriptService) {
        this.projectService = projectService;
        this.testCaseService = testCaseService;
        this.testSuiteService = testSuiteService;
        this.scriptService = scriptService;
    }

    @ModelAttribute
    public void addProjectsToModel(Model model) {
        List<ProjectDto> projects = projectService.getAllProjects();
        model.addAttribute("projects", projects);
    }

    @ModelAttribute
    public void addTestCasesToModel(Model model) {
        List<TestCaseDto> testCases = testCaseService.getAllTestCases();
        model.addAttribute("testCases", testCases);
    }

    @ModelAttribute
    public void addTestSuitesToModel(Model model) {
        List<TestSuite> testSuites = testSuiteService.getAllTestSuites();
        model.addAttribute("testSuites", testSuites);
    }

    @ModelAttribute
    public void addScriptsToModel(Model model) {
        List<ScriptDto> scripts = scriptService.getAllScripts();
        model.addAttribute("scripts", scripts);
    }

    @GetMapping({"/", "/index"})
    public String index(Model model, HttpServletRequest request) {
        setPath(model, request.getRequestURI());
        return "index"; // resolves to src/main/resources/templates/index.html via Thymeleaf
    }

    @GetMapping("/projects")
    public String projects(Model model, HttpServletRequest request) {
        setPath(model, request.getRequestURI());
        return "index";
    }

    @GetMapping("/login")
    public String redirectLogin() {
        return "redirect:/";
    }

    // Explicit routes to mirror SPA paths and always serve index.html
    @GetMapping({
            "/scripts",
            "/scripts/**",
            "/execution",
            "/monitoring",
            "/monitoring/audit-logs",
            "/monitoring/audit-stats",
            "/ui-automation",
            "/ui-automation/dashboard",
            "/ui-automation/test-cases",
            "/ui-automation/scripts",
            "/ui-automation/test-suites",
            "/ui-automation/ai-testing",
            "/ui-automation/execution-history",
            "/ui-automation/object-repository",
            "/ui-automation/test-data",
            "/ui-automation/scheduler",
            "/ui-automation/reports",
            "/api-automation",
            "/api-automation/dashboard",
            "/api-automation/collections",
            "/api-automation/requests",
            "/api-automation/test-suites",
            "/api-automation/mock-server",
            "/api-automation/monitoring",
            "/api-automation/ai-testing",
            "/api-automation/data-chaining",
            "/api-automation/schema-validation",
            "/api-automation/scripts",
            "/api-automation/environment",
            "/api-automation/reports",
            "/load-testing/dashboard",
            "/load-testing/test-plans",
            "/load-testing/configuration",
            "/load-testing/run-monitor",
            "/load-testing/results",
            "/load-testing/distributed",
            "/load-testing/templates",
            "/load-testing/ai-testing",
            "/ai-sql/runner",
            "/ai-sql/query-generator",
            "/ai-sql/scripts",
            "/ai-sql/history",
            "/ai-sql/explorer",
            "/ai-sql/validation",
            "/ai-sql/migration",
            "/ai-sql/performance",
            "/settings",
            "/settings/general",
            "/settings/projects",
            "/settings/credentials",
            "/settings/ai-config",
            "/settings/execution",
            "/settings/integrations",
            "/settings/notifications",
            "/settings/users",
            "/settings/security",
            "/settings/logs",
            "/security-automation",
            "/security-automation/vuln-scanner",
            "/security-automation/headers",
            "/security-automation/port-scanner",
            "/security-automation/ssl-check",
            "/security-automation/password-check",
            "/security-automation/jwt-analyzer",
            "/security-automation/input-test",
            "/security-automation/subdomain",
            "/security-automation/reports"
    })
    public String forwardKnown(Model model, HttpServletRequest request) {
        setPath(model, request.getRequestURI());
        return "index";
    }

    // Fallback for any non-API path to support client-side routing
    @RequestMapping(value = "/{path:^(?!api|css|js|images|static|webjars).*$}/**")
    public String forwardFallback(@PathVariable String path, Model model, HttpServletRequest request) {
        setPath(model, request.getRequestURI());
        return "index";
    }

    private void setPath(Model model, String path) {
        model.addAttribute("currentPath", path);
        model.addAttribute("pageTitle", friendlyName(path));
        model.addAttribute("section", sectionFor(path));
    }

    private String friendlyName(String path) {
        if (path == null || path.isBlank() || "/".equals(path) || "/index".equals(path)) {
            return "AI QA Copilot";
        }
        String trimmed = path.startsWith("/") ? path.substring(1) : path;
        String[] parts = trimmed.split("/");
        String last = parts.length == 0 ? trimmed : parts[parts.length - 1];
        String[] words = last.replace('-', ' ').split(" ");
        StringBuilder sb = new StringBuilder();
        for (String w : words) {
            if (w.isBlank()) continue;
            sb.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1)).append(' ');
        }
        return sb.toString().trim();
    }

    private String sectionFor(String path) {
        if (path == null || path.isEmpty() || path.equals("/") || path.equals("/index")) return "dashboard";
        if (path.equals("/projects")) return "projects";
        if (path.equals("/scripts") || path.startsWith("/scripts")) return "scripts";
        if (path.equals("/execution")) return "execution";
        if (path.equals("/monitoring")) return "monitoring";
        if (path.startsWith("/ui-automation")) return "uiAutomationDashboard";
        if (path.startsWith("/api-automation")) {
            if (path.equals("/api-automation") || path.equals("/api-automation/")) return "apiAutomation";
            if (path.contains("/dashboard")) return "apiAutomationDashboard";
            if (path.contains("/collections")) return "apiAutomationCollections";
            if (path.contains("/requests")) return "apiAutomationRequests";
            if (path.contains("/test-suites")) return "apiAutomationTestSuites";
            if (path.contains("/mock-server")) return "apiAutomationMockServer";
            if (path.contains("/monitoring")) return "apiAutomationMonitoring";
            if (path.contains("/ai-testing")) return "apiAutomationAiTesting";
            if (path.contains("/data-chaining")) return "apiAutomationDataChaining";
            if (path.contains("/schema-validation")) return "apiAutomationSchemaValidation";
            if (path.contains("/scripts")) return "apiAutomationScripts";
            if (path.contains("/environment")) return "apiAutomationEnvironment";
            if (path.contains("/reports")) return "apiAutomationReports";
            return "apiAutomation";
        }
        if (path.startsWith("/load-testing")) {
            if (path.equals("/load-testing") || path.equals("/load-testing/")) return "loadTestingDashboard";
            if (path.contains("/dashboard")) return "loadTestingDashboard";
            if (path.contains("/test-plans")) return "loadTestingTestPlans";
            if (path.contains("/configuration")) return "loadTestingConfiguration";
            if (path.contains("/run-monitor")) return "loadTestingRunMonitor";
            if (path.contains("/results")) return "loadTestingResults";
            if (path.contains("/distributed")) return "loadTestingDistributed";
            if (path.contains("/templates")) return "loadTestingTemplates";
            if (path.contains("/ai-testing")) return "loadTestingAiTesting";
            return "loadTestingDashboard";
        }
        if (path.startsWith("/ai-sql")) {
            if (path.equals("/ai-sql") || path.equals("/ai-sql/")) return "aiSqlRunner";
            if (path.contains("/runner")) return "aiSqlRunner";
            if (path.contains("/query-generator")) return "aiSqlQueryGenerator";
            if (path.contains("/scripts")) return "aiSqlScripts";
            if (path.contains("/history")) return "aiSqlHistory";
            if (path.contains("/explorer")) return "aiSqlExplorer";
            if (path.contains("/validation")) return "aiSqlValidation";
            if (path.contains("/migration")) return "aiSqlMigration";
            if (path.contains("/performance")) return "aiSqlPerformance";
            return "aiSqlRunner";
        }
        if (path.equals("/settings") || path.startsWith("/settings")) {
            if (path.equals("/settings") || path.equals("/settings/")) return "settingsGeneral";
            if (path.contains("/general")) return "settingsGeneral";
            if (path.contains("/projects")) return "settingsProjects";
            if (path.contains("/credentials")) return "settingsCredentials";
            if (path.contains("/ai-config")) return "settingsAiConfig";
            if (path.contains("/execution")) return "settingsExecution";
            if (path.contains("/integrations")) return "settingsIntegrations";
            if (path.contains("/notifications")) return "settingsNotifications";
            if (path.contains("/users")) return "settingsUsers";
            if (path.contains("/security")) return "settingsSecurity";
            if (path.contains("/logs")) return "settingsLogs";
            return "settingsGeneral";
        }
        if (path.startsWith("/security-automation")) {
            if (path.equals("/security-automation") || path.equals("/security-automation/")) return "securityAutomationDashboard";
            if (path.contains("/vuln-scanner")) return "securityAutomationVulnScanner";
            if (path.contains("/headers")) return "securityAutomationHeaders";
            if (path.contains("/port-scanner")) return "securityAutomationPortScanner";
            if (path.contains("/ssl-check")) return "securityAutomationSslCheck";
            if (path.contains("/password-check")) return "securityAutomationPasswordCheck";
            if (path.contains("/jwt-analyzer")) return "securityAutomationJwtAnalyzer";
            if (path.contains("/input-test")) return "securityAutomationInputTest";
            if (path.contains("/subdomain")) return "securityAutomationSubdomain";
            if (path.contains("/reports")) return "securityAutomationReports";
            return "securityAutomationDashboard";
        }
        return "dashboard";
    }
}
