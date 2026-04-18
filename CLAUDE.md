# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AIQA is a Spring Boot 3.2.4 + Thymeleaf application providing AI-powered QA automation capabilities, including UI testing, API automation, AI SQL tools, and security scanning. The application uses in-memory data storage with PostgreSQL persistence support.

## Common Commands

```bash
# Development
mvn spring-boot:run                    # Start dev server on port 8081
mvn compile                           # Compile source code
mvn package                          # Build JAR to target/

# Testing
mvn test                             # Run all tests
mvn test -Dtest=ClassName            # Run specific test class
mvn test -Dtest=ClassName#method     # Run specific test method

# Database
docker-compose up -d                 # Start PostgreSQL container
docker-compose down                  # Stop PostgreSQL container

# Playwright Sandbox
cd playwright-runner && npm install  # Install sandbox dependencies
cd playwright-runner && npm start    # Start sandbox execution service
```

## Architecture

### Layer Structure

```
src/main/java/com/example/aiqa/
├── controller/          # REST API endpoints (@RestController)
├── service/            # Business logic layer
│   └── ai/            # AI provider implementations (OpenAI, Ollama, Claude, Opencode)
├── repository/         # Data access layer (in-memory or JPA)
├── domain/            # Entity models
├── dto/               # Data transfer objects for API requests/responses
├── config/            # Spring configuration
└── exception/         # Custom exception handling
```

### Key Services

- **AutomationEngineService**: Generates test scripts using AI providers based on page analysis and user instructions
- **PlaywrightMCPService**: Manages browser sessions for live page interaction and testing (navigate, fill, click, type, screenshot, etc.)
- **SandboxExecutionService**: Secure script execution via Node.js sandbox with timeout and resource limits
- **ScriptExecutionService**: Orchestrates script running and result collection
- **SecurityServiceImpl**: Performs security scans (SQL injection, XSS, CSRF, headers analysis)
- **ChatService**: Handles AI chat interactions for query assistance

### AI Provider Pattern

The application supports multiple AI providers through the `AIService` interface:

- `OPENAI`: OpenAI GPT-4 (OpenAIProviderService)
- `OLLAMA`: Local LLM (not yet implemented)
- `CLAUDE`: Anthropic Claude (not yet implemented)
- `OPENCODE`: opencode AI (OpencodeAIProviderService)

Each provider implements `generateTestScript()` with different prompt engineering and API integration strategies. Provider selection is configured per request.

### Browser Automation

Playwright is used for:
- **Page Analysis**: Extracting elements, forms, buttons, inputs for AI context
- **Live Testing**: MCP (Model Context Protocol) style session-based browser control
- **Script Execution**: Running generated Playwright scripts in sandbox environment

Sessions are managed per-request with unique IDs, maintaining browser state for multi-step interactions.

### Frontend Structure

- **Thymeleaf Templates**: `src/main/resources/templates/`
  - `fragments/`: Reusable components (sidebar, header, sections, chat)
  - `pages/`: Feature-specific pages organized by module (api-automation, ui-automation, ai-sql, security)
- **Static Assets**: `src/main/resources/static/css/` and `js/`

## Database Configuration

- PostgreSQL 16 on localhost:5432 (docker-compose.yml)
- Database: `aiqa`, User: `postgres`, Password: `postgres`
- JPA with Hibernate DDL auto-update enabled
- Schema initialization via `src/main/resources/schema.sql`

## Git Workflow

- **Development branch**: `dev` - all development happens here
- **Production branch**: `master` - merge from dev when ready
- **CHANGELOG.md**: Updated with each push to dev documenting changes
- **Bug fixes**: Documented in `.bug_fixes/` directory with summary template
- Never push directly to master

See `.commands/workflow.md` for detailed workflow procedures including automated review and push process.

## Important Notes

- Server runs on **port 8081**, not default 8080
- Spring DevTools enabled for hot reload during development
- Playwright browsers must be installed: `mvn exec:java -Dexec.mainClass="com.microsoft.playwright.CLI" -Dexec.args="install"`
- AI API keys and credentials should be configured externally (not committed)
- Session-based browser automation requires proper session cleanup to avoid resource leaks
