# Bug Fix: DataSource Driver Class Not Found

**Date**: 2026-04-13

## Problem
After running `mvn -q clean -Dskiptests` while app is running, the Spring DevTools restart triggered a failure:
```
Failed to determine a suitable driver class
Failed to configure a DataSource: 'url' attribute is not specified
```

## Root Cause
1. Spring DevTools restarts the application when classpath changes
2. During restart, the `schema.sql` on classpath triggered `DataSourceScriptDatabaseInitializer`
3. The initializer couldn't find the driver because of timing issues during restart

## Solution
1. Disable DevTools restart to prevent this issue:
   ```properties
   spring.devtools.restart.enabled=false
   spring.devtools.livereload.enabled=false
   ```
2. Disable SQL init scripts (not needed since Hibernate manages schema):
   ```properties
   spring.sql.init.mode=never
   ```

## Files Changed
- `src/main/resources/application.properties`

## Verification
- Tests pass after changes
- Application starts cleanly after `mvn -q clean -Dskiptests`