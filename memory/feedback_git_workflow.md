---
name: feedback_git_workflow
description: User prefers automated review and testing before pushing to dev branch
type: feedback
---

**Why:** User wants to maintain code quality and prevent bugs from reaching the dev branch. They've experienced issues where untested or problematic code caused problems.

**How to apply:** Always run `mvn clean compile test` before allowing git commits. Use the automated git-push skill that includes code review. Never push directly to master branch - always merge from dev after proper testing.

The user has documented their preferred workflow in `.commands/workflow.md` and configured pre-commit hooks to enforce testing.
