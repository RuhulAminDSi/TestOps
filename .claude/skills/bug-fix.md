---
name: bug-fix
description: Complete bug fix workflow with documentation and testing
---

Fix a bug with proper documentation, testing, and verification.

## What happens:

1. Identifies the bug and root cause
2. Implements the fix
3. Creates a summary file in `.bug_fixes/` with detailed fix information
4. Runs unit tests (`mvn test`)
5. Runs UI tests if applicable
6. Verifies the fix works
7. Optionally pushes to dev branch

## Bug Fix Summary Template:

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

## Usage:

```
"Run bug fix workflow"
```

## Notes:

- All bug fix summaries are saved to `.bug_fixes/` directory
- Comprehensive testing is required before considering fix complete
- Include lessons learned to prevent similar issues
