# AIQA Backend

Spring Boot 3.2.4 + Thymeleaf + Maven/Java 17 app.

## Commands

```bash
mvn spring-boot:run   # Start dev server on port 8081
mvn package          # Build JAR to target/
```

## Structure

- `src/main/java/com/example/aiqa/` - Controllers, services, repositories, DTOs, domain
- `src/main/resources/templates/` - Thymeleaf HTML pages
- `src/main/resources/static/` - CSS, JS assets
- `.commands/` - Session notes (backend-frontend-wiring.md, frontend-session.md)

## Notes

- Server runs on **port 8081**, not default 8080
- No tests in `src/test/` yet
- API endpoints are in controllers under `/api/*`
- Frontend calls `/api/chat` for chat functionality