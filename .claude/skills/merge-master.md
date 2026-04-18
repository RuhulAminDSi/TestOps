---
name: merge-master
description: Merge dev branch into master
---

Merge your code from dev to master branch.

## What happens:

1. Switches to master branch
2. Pulls latest changes from GitHub
3. Merges dev branch into master
4. Pushes to master
5. Switches back to dev branch

## Usage:

```
"Commit in master"
```

## Notes:

- Only use when your dev code is ready for production
- Ensure all tests pass before merging
- CHANGELOG.md should be up to date with all changes
- Never push directly to master - always merge from dev
