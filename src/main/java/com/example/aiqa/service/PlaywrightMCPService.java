package com.example.aiqa.service;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.*;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PlaywrightMCPService {
    
    private static final int TIMEOUT_MS = 30000;
    private final Map<String, Playwright> playwrights = new ConcurrentHashMap<>();
    private final Map<String, Browser> browsers = new ConcurrentHashMap<>();
    private final Map<String, BrowserContext> contexts = new ConcurrentHashMap<>();
    private final Map<String, Page> pages = new ConcurrentHashMap<>();
    
    public String createSession() {
        Playwright pw = Playwright.create();
        Browser browser = pw.chromium().launch();
        BrowserContext context = browser.newContext();
        Page page = context.newPage();
        
        String sessionId = UUID.randomUUID().toString().substring(0, 8);
        playwrights.put(sessionId, pw);
        browsers.put(sessionId, browser);
        contexts.put(sessionId, context);
        pages.put(sessionId, page);
        
        System.out.println("Created session: " + sessionId);
        return sessionId;
    }
    
    public Map<String, Object> navigate(String sessionId, String url) {
        Page page = getPage(sessionId);
        try {
            page.navigate(url, new Page.NavigateOptions().setTimeout(TIMEOUT_MS));
            String title = page.title();
            String urlResult = page.url();
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("url", urlResult);
            result.put("title", title);
            result.put("action", "navigate");
            return result;
        } catch (Exception e) {
            return errorResult("navigate", e.getMessage());
        }
    }
    
    public Map<String, Object> fill(String sessionId, String selector, String value) {
        Page page = getPage(sessionId);
        try {
            page.fill(selector, value);
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("selector", selector);
            result.put("value", value);
            result.put("action", "fill");
            return result;
        } catch (Exception e) {
            return errorResult("fill", e.getMessage());
        }
    }
    
    public Map<String, Object> click(String sessionId, String selector) {
        Page page = getPage(sessionId);
        try {
            page.click(selector);
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("selector", selector);
            result.put("action", "click");
            return result;
        } catch (Exception e) {
            return errorResult("click", e.getMessage());
        }
    }
    
    public Map<String, Object> type(String sessionId, String selector, String text, Integer delay) {
        Page page = getPage(sessionId);
        try {
            if (delay != null && delay > 0) {
                page.locator(selector).type(text, new Locator.TypeOptions().setDelay(delay));
            } else {
                page.locator(selector).type(text);
            }
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("selector", selector);
            result.put("text", text);
            result.put("action", "type");
            return result;
        } catch (Exception e) {
            return errorResult("type", e.getMessage());
        }
    }
    
    public Map<String, Object> selectOption(String sessionId, String selector, String value) {
        Page page = getPage(sessionId);
        try {
            page.selectOption(selector, value);
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("selector", selector);
            result.put("value", value);
            result.put("action", "selectOption");
            return result;
        } catch (Exception e) {
            return errorResult("selectOption", e.getMessage());
        }
    }
    
    public Map<String, Object> getText(String sessionId, String selector) {
        Page page = getPage(sessionId);
        try {
            String text = page.locator(selector).first().textContent();
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("selector", selector);
            result.put("text", text);
            result.put("action", "getText");
            return result;
        } catch (Exception e) {
            return errorResult("getText", e.getMessage());
        }
    }
    
    public Map<String, Object> isVisible(String sessionId, String selector) {
        Page page = getPage(sessionId);
        try {
            boolean visible = page.locator(selector).first().isVisible();
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("selector", selector);
            result.put("visible", visible);
            result.put("action", "isVisible");
            return result;
        } catch (Exception e) {
            return errorResult("isVisible", e.getMessage());
        }
    }
    
    public Map<String, Object> screenshot(String sessionId, String filename) {
        Page page = getPage(sessionId);
        try {
            Path dir = Paths.get("screenshots");
            if (!Files.exists(dir)) {
                Files.createDirectories(dir);
            }
            
            String name = filename != null ? filename : "screenshot-" + System.currentTimeMillis() + ".png";
            Path path = dir.resolve(name);
            
            page.screenshot(new Page.ScreenshotOptions().setPath(path));
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("file", path.toString());
            result.put("action", "screenshot");
            return result;
        } catch (Exception e) {
            return errorResult("screenshot", e.getMessage());
        }
    }
    
    public Map<String, Object> waitForSelector(String sessionId, String selector, Integer timeout) {
        Page page = getPage(sessionId);
        try {
            int waitTime = timeout != null ? timeout : TIMEOUT_MS;
            page.waitForSelector(selector, new Page.WaitForSelectorOptions().setTimeout(waitTime));
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("selector", selector);
            result.put("action", "waitForSelector");
            return result;
        } catch (Exception e) {
            return errorResult("waitForSelector", e.getMessage());
        }
    }
    
    public Map<String, Object> waitForLoad(String sessionId, String state) {
        Page page = getPage(sessionId);
        try {
            String loadState = state != null ? state : "networkidle";
            page.waitForLoadState(LoadState.valueOf(loadState.toUpperCase()));
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("state", loadState);
            result.put("action", "waitForLoad");
            return result;
        } catch (Exception e) {
            return errorResult("waitForLoad", e.getMessage());
        }
    }
    
    public Map<String, Object> evaluate(String sessionId, String script) {
        Page page = getPage(sessionId);
        try {
            Object result = page.evaluate(script);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("sessionId", sessionId);
            response.put("result", result);
            response.put("action", "evaluate");
            return response;
        } catch (Exception e) {
            return errorResult("evaluate", e.getMessage());
        }
    }
    
    public Map<String, Object> closeSession(String sessionId) {
        try {
            Page page = pages.remove(sessionId);
            BrowserContext context = contexts.remove(sessionId);
            Browser browser = browsers.remove(sessionId);
            Playwright playwright = playwrights.remove(sessionId);
            
            if (page != null) page.close();
            if (context != null) context.close();
            if (browser != null) browser.close();
            if (playwright != null) playwright.close();
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("action", "close");
            return result;
        } catch (Exception e) {
            return errorResult("close", e.getMessage());
        }
    }
    
    public List<String> getActiveSessions() {
        return new ArrayList<>(pages.keySet());
    }
    
    public Map<String, Object> runAction(String sessionId, String action, Map<String, Object> params) {
        return switch (action.toLowerCase()) {
            case "navigate" -> navigate(sessionId, (String) params.get("url"));
            case "fill" -> fill(sessionId, (String) params.get("selector"), (String) params.get("value"));
            case "click" -> click(sessionId, (String) params.get("selector"));
            case "type" -> type(sessionId, (String) params.get("selector"), (String) params.get("text"), (Integer) params.get("delay"));
            case "select" -> selectOption(sessionId, (String) params.get("selector"), (String) params.get("value"));
            case "gettext" -> getText(sessionId, (String) params.get("selector"));
            case "visible" -> isVisible(sessionId, (String) params.get("selector"));
            case "screenshot" -> screenshot(sessionId, (String) params.get("filename"));
            case "wait" -> waitForSelector(sessionId, (String) params.get("selector"), (Integer) params.get("timeout"));
            case "waitload" -> waitForLoad(sessionId, (String) params.get("state"));
            case "eval" -> evaluate(sessionId, (String) params.get("script"));
            case "close" -> closeSession(sessionId);
            default -> errorResult(action, "Unknown action");
        };
    }
    
    private Page getPage(String sessionId) {
        Page page = pages.get(sessionId);
        if (page == null) {
            throw new IllegalArgumentException("Session not found: " + sessionId);
        }
        return page;
    }
    
    private Map<String, Object> errorResult(String action, String message) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", false);
        result.put("action", action);
        result.put("error", message);
        return result;
    }
}