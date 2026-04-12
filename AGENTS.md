# AIQA Backend

Spring Boot 3.2.4 + Thymeleaf + Maven/Java 17 app.

## Commands

```bash
mvn spring-boot:run   # Start dev server on port 8081
mvn package          # Build JAR to target/
mvn test             # Run tests
mvn compile         # Compile only
```

## Structure

- `src/main/java/com/example/aiqa/` - Controllers, services, repositories, DTOs, domain
- `src/main/resources/templates/` - Thymeleaf HTML pages
- `src/main/resources/static/` - CSS, JS assets
- `.commands/` - Session notes (workflow.md)

## Notes

- Server runs on **port 8081**, not default 8080
- Tests in `src/test/java/com/example/aiqa/` (ChatServiceTest, ChatControllerTest)
- API endpoints in controllers under `/api/*`
- Frontend calls `/api/chat` for chat functionality
- Git: development on `dev` branch, merge to `master` when ready
- CHANGELOG.md updated on each push to dev
