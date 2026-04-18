package com.example.aiqa.service.ai;

import java.util.List;

public interface AIService {
    
    enum Provider {
        OPENAI("openai", "OpenAI GPT-4"),
        OLLAMA("ollama", "Ollama Local"),
        CLAUDE("claude", "Anthropic Claude"),
        OPENCODE("opencode", "opencode AI");
        
        private final String id;
        private final String displayName;
        
        Provider(String id, String displayName) {
            this.id = id;
            this.displayName = displayName;
        }
        
        public String getId() { return id; }
        public String getDisplayName() { return displayName; }
        
        public static Provider fromId(String id) {
            for (Provider p : values()) {
                if (p.id.equalsIgnoreCase(id)) return p;
            }
            return OPENAI;
        }
    }
    
    record PageAnalysis(
        String url,
        String title,
        List<PageElement> elements,
        List<String> forms,
        List<String> buttons,
        List<String> inputs
    ) {}
    
    record PageElement(
        String type,
        String name,
        String selector,
        String id,
        String label,
        String tag
    ) {}
    
    String generateTestScript(Provider provider, String instruction, String url, String username, String password, PageAnalysis pageAnalysis);
    
    default PageAnalysis analyzePage(String url) {
        throw new UnsupportedOperationException("Browser automation not supported by this provider");
    }
    
    boolean isAvailable(Provider provider);
}