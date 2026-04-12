# MCP (Model Context Protocol) Commands

## Available MCP Tools

Use MCP for enhanced code analysis and automation.

### Code Analysis
- **Code Search**: Find code patterns across codebase
- **Web Search**: Search for documentation, solutions
- **Web Fetch**: Get content from URLs

### Example Usage

```python
# Code search for patterns
codesearch(query="Spring Boot @Cacheable example", tokensNum=5000)

# Web search for solutions
websearch(query="Spring Boot performance best practices 2024")

# Fetch specific documentation
webfetch(url="https://docs.spring.io/spring-boot/docs/current/reference/html/", format="markdown")
```

## MCP Server Setup (Optional)

If you want to run local MCP server:

1. Install Node.js
2. Install MCP: `npm install -g @modelcontextprotocol/server`
3. Configure in settings

## Notes
- MCP provides AI-powered code understanding
- Use for deep code analysis, refactoring suggestions
- Can analyze entire codebase for patterns