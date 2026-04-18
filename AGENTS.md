# AIQA Backend

Spring Boot 3.2.4 + Thymeleaf + Maven/Java 17. PostgreSQL backend.

## Commands

```bash
mvn spring-boot:run   # Dev server on port 8081
mvn package          # Build JAR to target/
mvn test             # Run all tests
mvn compile         # Compile only
```

## Structure

- `src/main/java/com/example/aiqa/` - Controllers, services, repositories, DTOs, domain
- `src/main/resources/templates/` - Thymeleaf HTML pages
- `src/main/resources/static/` - CSS, JS assets

## Database

- PostgreSQL on `localhost:5432/aiqa` (user: postgres, pass: postgres)
- Run via: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aiqa postgres:16`

## Notes

- Server runs on **port 8081**, not default 8080
- Tests: `ChatServiceTest`, `ChatControllerTest`, `SecurityServiceTest`
- API endpoints under `/api/*`, main chat endpoint at `/api/chat`
- Git: development on `dev` branch, merge to `master`
- CHANGELOG.md updated on each push to dev
