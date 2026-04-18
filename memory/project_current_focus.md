---
name: project_current_focus
description: Project focuses on AI-powered QA automation with UI testing, API automation, and security scanning
type: project
---

**Why:** The AIQA project is designed as a comprehensive QA automation platform leveraging AI for test generation and execution. The architecture supports multiple AI providers and automation types.

**How to apply:** When working on this project, always consider the AI integration aspects. Changes should support the multi-provider AI architecture (OpenAI, Claude, Ollama, Opencode). Maintain separation between UI automation, API automation, AI SQL tools, and security scanning modules.

## Key Architectural Decisions
- In-memory data storage with PostgreSQL persistence
- Session-based Playwright browser automation
- Multi-provider AI service pattern
- Thymeleaf for server-side rendering
- Spring Boot 3.2.4 with Java 17

## Current Modules
- UI Automation (Playwright-based testing)
- API Automation (REST API testing)
- AI SQL Tools (Query generation and optimization)
- Security Scanning (SQL injection, XSS, CSRF detection)
