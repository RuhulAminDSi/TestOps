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

## Command 2: Merge to master

**When:** You want your code in the main/master branch on GitHub

**What to do:** Just tell me:
> "Commit in master"

**What happens:**
1. I switch to master branch
2. Pull latest from GitHub
3. Merge your `dev` code
4. Push to master
5. Switch back to dev

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

## Summary

| Your Action | Agent/I Do |
|-------------|-------------|
| "Push my code" | Agent reviews → creates CHANGELOG.md → pushes to dev |
| "Commit in master" | I merge dev → master |
| Manual commands | Use table above |

---

## Important Rules

- All development happens in `dev` branch
- Never push directly to master
- Agent won't push if tests fail or issues found
- CHANGELOG.md is updated with each push
- Ask me to merge when ready