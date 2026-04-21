# UI Automation Button Fix

## Issue
- Buttons on `ui-automation/test-cases`, `ui-automation/scripts`, `ui-automation/test-suites`, and `ui-automation/scheduler` were inert because they rendered as plain buttons without any modal toggle, click handler, or navigation target.
- The `Run` buttons on `ui-automation/test-cases` were also inert for the same reason.

## Fix
- Reused the existing shared modal behavior driven by `data-modal-toggle` in `src/main/resources/static/js/app.js`.
- Added modal markup and wired the primary CTA button on each affected page to open it.
- Added a run confirmation modal for the `Run` action on `ui-automation/test-cases`.

## Files Changed
- `src/main/resources/templates/pages/ui-automation/ui-automation-test-cases.html`
- `src/main/resources/templates/pages/ui-automation/ui-automation-scripts.html`
- `src/main/resources/templates/pages/ui-automation/ui-automation-test-suites.html`
- `src/main/resources/templates/pages/ui-automation/ui-automation-scheduler.html`

## Verification
- `mvn test` -> passed
- Playwright checks against the running app on `http://localhost:8081` confirmed:
- `New Test Case` opens `new-test-case-modal`
- Test-case `Run` opens `run-test-case-modal`
- `New Script` opens `new-script-modal`
- `New Suite` opens `new-suite-modal`
- `New Schedule` opens `new-schedule-modal`
