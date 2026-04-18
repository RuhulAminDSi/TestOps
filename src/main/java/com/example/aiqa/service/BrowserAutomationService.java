package com.example.aiqa.service;

import com.example.aiqa.service.ai.AIService.PageAnalysis;
import com.example.aiqa.service.ai.AIService.PageElement;
import com.microsoft.playwright.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;

@Service
public class BrowserAutomationService {
    
    private static final int TIMEOUT_SECONDS = 30;
    private Playwright playwright;
    private Browser browser;
    
    public PageAnalysis analyzePage(String url) {
        try (Playwright pw = Playwright.create()) {
            Browser b = pw.chromium().launch();
            Page page = b.newPage();
            
            page.navigate(url, new Page.NavigateOptions()
                .setTimeout(TIMEOUT_SECONDS * 1000.0));
            
            String title = page.title();
            List<PageElement> elements = extractElements(page);
            List<String> forms = extractForms(page);
            List<String> buttons = extractButtons(page);
            List<String> inputs = extractInputs(page);
            
            b.close();
            
            return new PageAnalysis(url, title, elements, forms, buttons, inputs);
        } catch (Exception e) {
            System.err.println("Page analysis error: " + e.getMessage());
            return new PageAnalysis(url, "Error", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        }
    }
    
    private List<PageElement> extractElements(Page page) {
        List<PageElement> elements = new ArrayList<>();
        
        try {
            List<Locator> inputs = page.locator("input, textarea, select").all();
            for (Locator loc : inputs) {
                String id = loc.getAttribute("id");
                String name = loc.getAttribute("name");
                String type = loc.getAttribute("type");
                String label = findLabel(page, id, name);
                elements.add(new PageElement(type != null ? type : "input", name, "#" + id, id, label, "input"));
            }
            
            List<Locator> btns = page.locator("button, a[role='button']").all();
            for (Locator loc : btns) {
                String id = loc.getAttribute("id");
                String text = loc.textContent();
                elements.add(new PageElement("button", text, "#" + id, id, text, "button"));
            }
        } catch (Exception e) {
            System.err.println("Element extraction error: " + e.getMessage());
        }
        
        return elements;
    }
    
    private List<String> extractForms(Page page) {
        List<String> forms = new ArrayList<>();
        try {
            int count = page.locator("form").count();
            forms.add(count + " form(s) found");
        } catch (Exception e) {
            forms.add("Error finding forms");
        }
        return forms;
    }
    
    private List<String> extractButtons(Page page) {
        List<String> buttons = new ArrayList<>();
        try {
            List<Locator> btns = page.locator("button").all();
            for (Locator btn : btns) {
                String text = btn.textContent();
                if (text != null && !text.isBlank()) {
                    buttons.add(text.trim());
                }
            }
        } catch (Exception e) {
            buttons.add("Error finding buttons");
        }
        return buttons;
    }
    
    private List<String> extractInputs(Page page) {
        List<String> inputs = new ArrayList<>();
        try {
            List<Locator> inps = page.locator("input, textarea").all();
            for (Locator inp : inps) {
                String type = inp.getAttribute("type");
                String name = inp.getAttribute("name");
                inputs.add(type + ": " + name);
            }
        } catch (Exception e) {
            inputs.add("Error finding inputs");
        }
        return inputs;
    }
    
    private String findLabel(Page page, String forId, String inputName) {
        if (forId != null) {
            Locator label = page.locator("label[for='" + forId + "']");
            if (label.count() > 0) {
                return label.first().textContent();
            }
        }
        
        if (inputName != null) {
            Locator label = page.locator("label:has(input[name='" + inputName + "'])");
            if (label.count() > 0) {
                return label.first().textContent();
            }
        }
        
        return null;
    }
    
    public void close() {
        if (browser != null) {
            browser.close();
        }
        if (playwright != null) {
            playwright.close();
        }
    }
}