# Code Review Agent

## Workflow

### 1. Pre-Review Checklist
- [ ] Run lint/typecheck first
- [ ] Check for security issues (secrets, SQL injection, XSS)
- [ ] Verify code follows project conventions

### 2. Review Areas

**Code Quality**:
- Clean code principles
- DRY, SOLID where applicable
- Proper error handling
- Logging appropriate

**Security**:
- No hardcoded secrets/credentials
- Input validation
- SQL injection prevention
- XSS prevention

**Performance**:
- N+1 queries
- Unnecessary loops
- Memory leaks
- Missing indexes

**Testing**:
- Unit tests exist
- Edge cases covered

### 3. Review Commands

```powershell
# Run lint (adjust based on project)
mvn compile

# Check git diff
git diff HEAD~1

# Run tests
mvn test
```

### 4. Output Format

Provide review in:
- **Files changed**: List
- **Issues found**: Severity (High/Medium/Low) + description + line number
- **Suggestions**: Improvement recommendations
- **LGTM**: Approval or request changes

### 5. Using with Task Tool

```python
Task(description="Review code", prompt="Review PR #X or recent commits", subagent_type="explore")
```