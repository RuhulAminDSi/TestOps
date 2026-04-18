# Claude Code Configuration

This directory contains custom skills, agents, and hooks configured for the AIQA project.

## Structure

```
.claude/
├── settings.json          # Main configuration with hooks and basic skills
├── hooks.json             # Automated triggers for file operations and git events
├── skills/                # Custom skills for common tasks
│   ├── git-push.md       # Push code with review and testing
│   ├── merge-master.md   # Merge dev to master branch
│   ├── bug-fix.md        # Complete bug fix workflow
│   ├── setup-dev.md      # Development environment setup
│   └── database.md       # Database operations and management
└── agents/               # Specialized agents for specific tasks
    ├── code-review.md    # Code review and analysis
    └── test-runner.md    # Test execution and analysis
```

## Available Skills

### Development Workflow
- **git-push**: Push code to dev with automated review, testing, and CHANGELOG update
- **merge-master**: Merge dev branch into master
- **bug-fix**: Complete bug fix workflow with documentation

### Environment Setup
- **setup-dev**: Set up complete development environment (Java, Maven, Node.js, PostgreSQL, Playwright)
- **database**: Database operations (start, stop, backup, restore)

### Quick Operations (in settings.json)
- **test**: Run Maven tests
- **build**: Build project with Maven
- **run**: Start Spring Boot application
- **db-start/db-stop**: Database container control
- **playwright-install**: Install Playwright browsers
- **sandbox-start**: Start Playwright sandbox service

## Available Agents

### code-review
Specialized code review agent for AIQA project that checks for:
- Security vulnerabilities (SQL injection, XSS, CSRF)
- Performance issues (N+1 queries, memory leaks)
- Bugs and error handling
- Spring Boot best practices
- Playwright session management

### test-runner
Test execution and analysis agent that:
- Runs all or specific tests
- Analyzes test failures
- Checks test coverage
- Verifies integration tests

## Automated Hooks

### Pre-Commit
- Runs `mvn clean compile test` before allowing commits
- Blocks commit if tests fail

### File-Save Triggers
- **Java files**: Auto-compile on save
- **Test files**: Run related tests on save  
- **application.properties**: Configuration validation
- **pom.xml**: Dependency resolution

## Usage Examples

```bash
# Set up development environment
/setup-dev

# Push code with review
/git-push

# Merge to master
/merge-master

# Fix a bug properly
/bug-fix

# Run tests
/test

# Database operations
/database start
/database backup
```

## Project-Specific Configuration

These configurations are tailored for the AIQA project:
- Spring Boot 3.2.4 with Maven
- PostgreSQL database
- Playwright browser automation
- AI provider integrations (OpenAI, Claude, Ollama, Opencode)
- Git workflow (dev → master)

## Customization

To add new skills, create markdown files in `.claude/skills/` with frontmatter:
```yaml
---
name: skill-name
description: What this skill does
---
```

To add new agents, create markdown files in `.claude/agents/` with:
```yaml
---
name: agent-name
description: Agent purpose
model: claude-sonnet-4-6
---
```

To modify hooks, edit `.claude/hooks.json` with trigger configurations.
