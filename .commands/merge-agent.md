# Merge Agent

## Workflow

### 1. Pre-Merge Checklist
- [ ] All tests pass: `mvn test`
- [ ] Build succeeds: `mvn package`
- [ ] No lint errors
- [ ] Code reviewed and approved

### 2. Merge Steps

**Option A: Local Merge**
```powershell
# Checkout target branch
git checkout main

# Pull latest
git pull origin main

# Merge feature branch
git merge feature/branch-name

# Push
git push origin main
```

**Option B: GitHub PR Merge (if gh CLI available)**
```powershell
# View PR
gh pr view <pr-number>

# Merge PR
gh pr merge <pr-number> --admin --merge

# Or squash merge
gh pr merge <pr-number> --admin --squash
```

### 3. Conflict Resolution

```powershell
# See conflicts
git status

# Open files with conflicts, resolve manually
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push
```

### 4. Post-Merge

```powershell
# Delete merged branch (optional)
git branch -d feature/branch-name
git push origin --delete feature/branch-name
```

## Notes
- Never force push to main/master
- Ensure CI passes before merge
- Use squash merge for clean history