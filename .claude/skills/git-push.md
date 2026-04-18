---
name: git-push
description: Push code to dev branch with automated review and testing
---

Push your code changes to the dev branch with automated review, testing, and CHANGELOG update.

## What happens:

1. Runs `mvn compile` to verify compilation
2. Runs `mvn test` to execute all tests
3. Reviews code changes for bugs, security issues, and performance problems
4. If issues found: Reports problems without pushing
5. If all good:
   - Creates/updates CHANGELOG.md with changes
   - Commits with descriptive message
   - Pushes to dev branch

## Usage:

```
"Push my code"
```

## Notes:

- Only pushes to dev branch, never master
- Will not push if tests fail or issues are found
- CHANGELOG.md format follows the template in .commands/workflow.md
- All development should happen in dev branch
