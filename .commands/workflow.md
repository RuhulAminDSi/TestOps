# AIQA Git Workflow - Easy Guide

## How It Works

You code locally → Agent reviews & checks performance → Creates change log → Pushes to `dev` → When ready, I merge to `master`

---

## Command 1: Push Your Code to dev

**When:** After you finish coding and want to upload to GitHub

**What to do:** Just tell me:
> "Push my code"

Or use this tool:
```
Task(description="review and push", prompt="Run mvn compile and mvn test, review my code changes for bugs/security/performance, if all good then: 1) create/update CHANGELOG.md with what changed 2) git add . 3) git commit with your message 4) git push origin dev", subagent_type="explore")
```

**What happens:**
1. Agent compiles your code (`mvn compile`)
2. Agent runs tests (`mvn test`)
3. Agent checks for bugs, security issues, performance problems
4. **If problems found** → Agent tells you what's wrong (no push)
5. **If all good** → 
   - Creates/updates `CHANGELOG.md` with changes
   - Commits and pushes to `dev` branch

---

## Command 2: Merge to master (with Release Plan)

**When:** You want your code in the main/master branch on GitHub

**What to do:** Just tell me:
> "Commit in master"

**What happens:**
1. I switch to master branch
2. Pull latest from GitHub
3. Merge your `dev` code
4. **Create release version** (v1.0.0, v1.0.1, etc.)
5. **Generate release notes** from CHANGELOG
6. **Create git tag** (e.g., v1.0.0)
7. Push to master with tag
8. Switch back to dev

**Release Plan includes:**
- Semantic version bump (major.minor.patch)
- Release notes from CHANGELOG
- Git tag creation

---

## Release Notes Format

```markdown
# Release v1.0.0

## Features
- New workflow guide added

## Bug Fixes
- None

## Changes
- Simplified command structure

---
Generated from CHANGELOG.md
```

---

## Command 3: Quick Git Check (Manual)

| What | Command |
|------|---------|
| See what you changed | `git status` |
| See code differences | `git diff` |
| Manually add + commit | `git add .; git commit -m "message"` |
| Manually push to dev | `git push origin dev` |

---

## CHANGELOG.md Format

Each commit updates CHANGELOG.md:

```markdown
# Changelog

## 2024-01-15
- Added: User login API endpoint
- Fixed: N+1 query in user service
- Updated: Improved error handling

## 2024-01-14
- Added: User model and repository
```

---

## Command 5: Bug Fix Workflow

**When:** You have fixed a bug and want to document it properly, run tests, and ensure the fix is verified.

**What to do:** Say "Run bug fix workflow" or use the task below.

**What happens:**
1. Identifies the bug and root cause
2. Implements the fix
3. Creates a summary file in `.bug_fixes` with fix details
4. Runs unit tests (`mvn test`)
5. Runs UI tests (if applicable)
6. Verifies the fix works
7. Optionally pushes to dev branch

```
Task(description="bug fix workflow", prompt="Fix bug, save summary to .bug_fixes, run unit and UI tests", subagent_type="explore")
```

### Bug Fix Summary Template

When saving to `.bug_fixes`, use this format:

```markdown
# Bug Fix Summary

## Date: YYYY-MM-DD

## Issue Description
- What was the problem?
- Error messages or symptoms

## Root Cause
- Why did this happen?
- What code/config caused it?

## Solution Applied
- Steps taken to fix
- Files modified
- Commands run

## Verification
- Test results
- Before/after behavior

## Configuration or Dependencies
- Any config changes?
- New dependencies?

## Notes
- Lessons learned
- Prevention suggestions
```

### Example Summary

```markdown
# Bug Fix Summary

## Date: 2026-04-13

## Issue
Application failed to start with "Failed to configure a DataSource" error.

## Root Cause
PostgreSQL container not running, application couldn't connect to database.

## Solution
1. Created docker-compose.yml for PostgreSQL
2. Started container: docker run -d --name aiqa-postgres ...
3. Freed port 8081 from other process
4. Started application: mvn spring-boot:run

## Verification
- Application started successfully on port 8081
- Database connection working (HikariPool-1 started)
- All tests passed

## Notes
- Always ensure PostgreSQL is running before starting app
- Added docker-compose.yml for easy setup
```

## Summary

| Your Action | Agent/I Do |
|-------------|-------------|
| "Push my code" | Agent reviews → creates CHANGELOG.md → pushes to dev |
| "Commit in master" | I merge dev → master + create release tag + generate release notes |
| Manual commands | Use table above |

---

## Important Rules

- All development happens in `dev` branch
- Never push directly to master
- Agent won't push if tests fail or issues found
- CHANGELOG.md is updated with each push
- Ask me to merge when ready