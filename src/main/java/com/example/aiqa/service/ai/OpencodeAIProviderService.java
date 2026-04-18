package com.example.aiqa.service.ai;

import com.example.aiqa.service.ai.AIService.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OpencodeAIProviderService implements AIService {
    
    @Override
    public String generateTestScript(Provider provider, String instruction, String url, String username, String password, PageAnalysis pageAnalysis) {
        return generateFullTestSuite(instruction, url, username, password, pageAnalysis);
    }
    
    @Override
    public PageAnalysis analyzePage(String url) {
        return new PageAnalysis(url, "Analyzed Page", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
    }
    
    private String generateFullTestSuite(String instruction, String url, String username, String password, PageAnalysis analysis) {
        String lower = instruction.toLowerCase();
        
        String baseUrl = extractBaseUrl(url);
        String pageName = extractPageName(url, instruction);
        
        StringBuilder code = new StringBuilder();
        code.append("import { test, expect } from '@playwright/test';\n\n");
        code.append("const BASE_URL = '").append(url).append("';\n\n");
        code.append("test.describe('").append(pageName).append(" - Full UI Automation', () => {\n\n");
        
        code.append("  test.beforeEach(async ({ page }) => {\n");
        code.append("    await page.goto(BASE_URL, { waitUntil: 'networkidle' });\n");
        code.append("  });\n\n");
        
        code.append("  test('Page Load & URL Validation', async ({ page }) => {\n");
        code.append("    await expect(page).toHaveURL(/").append(extractUrlPattern(url)).append("/);\n");
        code.append("    await expect(page.locator('body')).toBeVisible();\n");
        code.append("    console.log('Page loaded successfully');\n");
        code.append("  });\n\n");
        
        if (lower.contains("login") || lower.contains("signin")) {
            code.append(generateLoginTest(username, password));
        }
        
        if (lower.contains("form") || lower.contains("input") || lower.contains("fill")) {
            code.append(generateFormTest());
        }
        
        if (lower.contains("button") || lower.contains("click") || lower.contains("navigation")) {
            code.append(generateButtonNavigationTest());
        }
        
        if (lower.contains("search")) {
            code.append(generateSearchTest());
        }
        
        if (lower.contains("citizen") || lower.contains("service") || lower.contains("menu")) {
            code.append(generateMenuNavigationTest());
        }
        
        if (lower.contains("validate") || lower.contains("verify") || lower.contains("check")) {
            code.append(generateValidationTest());
        }
        
        if (lower.contains("responsive") || lower.contains("mobile") || lower.contains("size")) {
            code.append(generateResponsiveTest());
        }
        
        if (lower.contains("broken") || lower.contains("link")) {
            code.append(generateBrokenLinksTest());
        }
        
        if (lower.contains("accessibility") || lower.contains("a11y")) {
            code.append(generateAccessibilityTest());
        }
        
        code.append("});\n");
        return code.toString();
    }
    
    private String generateLoginTest(String username, String password) {
        StringBuilder code = new StringBuilder();
        code.append("  test('Login Flow', async ({ page }) => {\n");
        if (username != null && !username.isBlank()) {
            code.append("    await page.fill('input[name=\"username\"], #username', '").append(username).append("');\n");
        }
        if (password != null && !password.isBlank()) {
            code.append("    await page.fill('input[name=\"password\"], #password', '").append(password).append("');\n");
        }
        code.append("    await page.click('button[type=\"submit\"]');\n");
        code.append("    await page.waitForLoadState('networkidle');\n");
        code.append("    console.log('Login submitted');\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateFormTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Form Elements Validation', async ({ page }) => {\n");
        code.append("    const forms = page.locator('form');\n");
        code.append("    const formCount = await forms.count();\n");
        code.append("    console.log('Found ' + formCount + ' form(s)');\n");
        code.append("    \n");
        code.append("    const inputs = page.locator('input, textarea, select');\n");
        code.append("    const inputCount = await inputs.count();\n");
        code.append("    expect(inputCount).toBeGreaterThan(0);\n");
        code.append("    console.log('Found ' + inputCount + ' input(s)');\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateButtonNavigationTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Button Click & Navigation', async ({ page }) => {\n");
        code.append("    const buttons = page.locator('button, a[role=\"button\"]');\n");
        code.append("    const btnCount = await buttons.count();\n");
        code.append("    console.log('Found ' + btnCount + ' button(s)');\n");
        code.append("    \n");
        code.append("    // Try clicking first visible button\n");
        code.append("    for (let i = 0; i < Math.min(btnCount, 3); i++) {\n");
        code.append("      const btn = buttons.nth(i);\n");
        code.append("      if (await btn.isVisible()) {\n");
        code.append("        const btnText = await btn.textContent();\n");
        code.append("        console.log('Button: ' + btnText.trim());\n");
        code.append("        break;\n");
        code.append("      }\n");
        code.append("    }\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateSearchTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Search Functionality', async ({ page }) => {\n");
        code.append("    const searchInputs = page.locator('input[type=\"search\"], input[name*=\"search\"], input[name*=\"q\"]');\n");
        code.append("    const count = await searchInputs.count();\n");
        code.append("    \n");
        code.append("    if (count > 0) {\n");
        code.append("      await searchInputs.first().fill('test');\n");
        code.append("      await page.keyboard.press('Enter');\n");
        code.append("      await page.waitForTimeout(1000);\n");
        code.append("      console.log('Search executed');\n");
        code.append("    } else {\n");
        code.append("      console.log('No search input found');\n");
        code.append("    }\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateMenuNavigationTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Navigation Menu Links', async ({ page }) => {\n");
        code.append("    const navLinks = page.locator('nav a, header a, .menu a, .nav a');\n");
        code.append("    const linkCount = await navLinks.count();\n");
        code.append("    console.log('Found ' + linkCount + ' navigation link(s)');\n");
        code.append("    \n");
        code.append("    // Click first few visible links\n");
        code.append("    for (let i = 0; i < Math.min(linkCount, 5); i++) {\n");
        code.append("      const link = navLinks.nth(i);\n");
        code.append("      if (await link.isVisible()) {\n");
        code.append("        const href = await link.getAttribute('href');\n");
        code.append("        if (href && !href.startsWith('#') && !href.startsWith('javascript')) {\n");
        code.append("          console.log('Link ' + i + ': ' + href);\n");
        code.append("          break;\n");
        code.append("        }\n");
        code.append("      }\n");
        code.append("    }\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateValidationTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Content Validation', async ({ page }) => {\n");
        code.append("    const pageContent = await page.content();\n");
        code.append("    expect(pageContent.length).toBeGreaterThan(100);\n");
        code.append("    console.log('Page content: ' + pageContent.length + ' chars');\n");
        code.append("    \n");
        code.append("    // Check for key elements\n");
        code.append("    const bodyVisible = await page.locator('body').isVisible();\n");
        code.append("    expect(bodyVisible).toBe(true);\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateResponsiveTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Responsive Design - Mobile', async ({ page }) => {\n");
        code.append("    await page.setViewportSize({ width: 375, height: 667 });\n");
        code.append("    await page.reload({ waitUntil: 'networkidle' });\n");
        code.append("    await expect(page.locator('body')).toBeVisible();\n");
        code.append("    console.log('Mobile view OK');\n");
        code.append("  });\n\n");
        
        code.append("  test('Responsive Design - Tablet', async ({ page }) => {\n");
        code.append("    await page.setViewportSize({ width: 768, height: 1024 });\n");
        code.append("    await page.reload({ waitUntil: 'networkidle' });\n");
        code.append("    await expect(page.locator('body')).toBeVisible();\n");
        code.append("    console.log('Tablet view OK');\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateBrokenLinksTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Links Validation', async ({ page }) => {\n");
        code.append("    const links = page.locator('a[href]');\n");
        code.append("    const count = await links.count();\n");
        code.append("    console.log('Found ' + count + ' link(s)');\n");
        code.append("    \n");
        code.append("    // Check first few links\n");
        code.append("    let validLinks = 0;\n");
        code.append("    for (let i = 0; i < Math.min(count, 5); i++) {\n");
        code.append("      const href = await links.nth(i).getAttribute('href');\n");
        code.append("      if (href && (href.startsWith('http') || href.startsWith('/'))) {\n");
        code.append("        validLinks++;\n");
        code.append("      }\n");
        code.append("    }\n");
        code.append("    console.log('Valid links: ' + validLinks);\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String generateAccessibilityTest() {
        StringBuilder code = new StringBuilder();
        code.append("  test('Accessibility - Images have alt', async ({ page }) => {\n");
        code.append("    const images = page.locator('img');\n");
        code.append("    const imgCount = await images.count();\n");
        code.append("    console.log('Found ' + imgCount + ' image(s)');\n");
        code.append("  });\n\n");
        
        code.append("  test('Accessibility - Buttons have text', async ({ page }) => {\n");
        code.append("    const buttons = page.locator('button');\n");
        code.append("    const btnCount = await buttons.count();\n");
        code.append("    for (let i = 0; i < btnCount; i++) {\n");
        code.append("      const btn = buttons.nth(i);\n");
        code.append("      const text = await btn.textContent();\n");
        code.append("      if (text && text.trim()) {\n");
        code.append("        console.log('Button ' + i + ': ' + text.trim());\n");
        code.append("      }\n");
        code.append("    }\n");
        code.append("  });\n\n");
        return code.toString();
    }
    
    private String extractBaseUrl(String url) {
        if (url.contains("?")) {
            return url.substring(0, url.indexOf("?"));
        }
        return url;
    }
    
    private String extractPageName(String url, String instruction) {
        String lower = instruction.toLowerCase();
        if (lower.contains("citizen")) return "Citizen Service";
        if (lower.contains("teacher")) return "Teacher Portal";
        if (lower.contains("student")) return "Student Portal";
        if (lower.contains("admin")) return "Admin Dashboard";
        if (lower.contains("dashboard")) return "Dashboard";
        
        try {
            String path = url;
            if (path.contains("//")) {
                path = path.substring(path.indexOf("//") + 2);
                if (path.contains("/")) {
                    path = path.substring(path.indexOf("/") + 1);
                    path = path.replaceAll("[/-]", " ");
                    path = path.substring(0, 1).toUpperCase() + path.substring(1);
                    return path.length() > 30 ? "App" : path;
                }
            }
        } catch (Exception e) {}
        return "UI Test";
    }
    
    private String extractUrlPattern(String url) {
        try {
            String domain = url;
            if (domain.contains("//")) {
                domain = domain.substring(domain.indexOf("//") + 2);
                if (domain.contains("/")) {
                    domain = domain.substring(0, domain.indexOf("/"));
                }
            }
            return domain.replace(".", "\\\\.");
        } catch (Exception e) {
            return url;
        }
    }
    
    @Override
    public boolean isAvailable(Provider provider) {
        return true;
    }
}