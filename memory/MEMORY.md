# Memory Index

This file indexes all memories stored in the memory system. Each memory is a separate file that provides persistent context for future conversations.

## User Memories
- [Project Developer](memory/user_developer.md) - User is a developer working on AIQA project with Spring Boot and Playwright

## Feedback Memories
- [Git Workflow Preferences](memory/feedback_git_workflow.md) - User prefers automated review and testing before pushing to dev branch

## Project Memories
- [Current Development Focus](memory/project_current_focus.md) - Project focuses on AI-powered QA automation with UI testing, API automation, and security scanning

## Reference Memories
- [External Systems](memory/reference_external_systems.md) - References to external systems and documentation

---

## How to Use This System

### When to Access Memory
- When the user explicitly asks you to check, recall, or remember something
- When memories seem relevant to the current task or conversation
- When the user references prior-conversation work

### When to Ignore Memory
- When the user explicitly says to ignore or not use memory
- When memory might conflict with current information

### Memory vs. Plan vs. Tasks
- **Memory**: For future conversations and long-term context
- **Plan**: For current implementation tasks requiring user approval  
- **Tasks**: For tracking work within the current conversation

## Adding New Memories

When you learn something worth remembering:

1. Create a new memory file in `memory/` directory
2. Use appropriate frontmatter format
3. Add entry to this index file
4. Keep entry under 150 characters with one-line hook

### Memory File Format

```markdown
---
name: {{memory name}}
description: {{one-line description}}
type: {{user|feedback|project|reference}}
---

{{memory content}}
```

## Important Notes

- Memory records can become stale. Verify against current state before using
- Memory is frozen in time - prefer `git log` or reading code for recent/current state
- Don't save code patterns, architecture, or file paths (can be derived)
- Focus on non-obvious information that aids future conversations
