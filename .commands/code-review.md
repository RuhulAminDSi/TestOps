# Code Review Command

Use this for code review tasks:

1. **Local Code Review (Agent)**:
   - Use `Task` tool with `subagent_type: "code-reviewer"` to review code changes
   
2. **GitHub PR Review (gh CLI)**:
   - Run: `gh pr view <pr-number> --json title,body,reviews,comments`
   - Run: `gh pr diff <pr-number>` to see changes
   - Run: `gh pr review <pr-number> --body "Your review comments"`

3. **MCP Code Review** (if MCP server is configured):
   - Use the MCP tool endpoint for code analysis

Examples:
- Review local changes: `Task` with code-reviewer agent
- Review PR #5: `gh pr diff 5`
- Add review comment: `gh pr review 5 --approve --body "LGTM"`