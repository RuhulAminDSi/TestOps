# GitHub Push Commands

## Push to Remote

1. **Add and Commit**:
   ```powershell
   git add .
   git commit -m "Your message"
   ```

2. **Push to Remote**:
   ```powershell
   git push origin <branch-name>
   ```

3. **Push with upstream** (first time):
   ```powershell
   git push -u origin <branch-name>
   ```

## Quick Push (one-liner)
```powershell
git add .; git commit -m "Your message"; git push
```

## MCP Push (if MCP server configured)
- Use MCP tool endpoint for git operations

## Notes
- Install gh CLI from: https://cli.github.com
- Authenticate with: `gh auth login`
- Create PR after push: `gh pr create --title "Title" --body "Description"`