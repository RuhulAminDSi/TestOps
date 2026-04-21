# AIQA

## Stack
- Single-module Spring Boot 3.2.4 app on Java 17 with Maven; there is no `mvnw`, so use the system `mvn`.
- App serves Thymeleaf templates plus JSON APIs from the same backend.

## Run And Verify
- Start dev server: `mvn spring-boot:run`
- Server port is `8081`, not Spring Boot's default `8080`.
- Full test suite: `mvn test`
- Single test class: `mvn -Dtest=ChatServiceTest test`
- Package jar: `mvn package`

## Database
- Runtime DB is PostgreSQL at `jdbc:postgresql://localhost:5432/aiqa` with `postgres/postgres` from `src/main/resources/application.properties`.
- JPA is configured with `spring.jpa.hibernate.ddl-auto=update`; do not assume `src/main/resources/schema.sql` is applied automatically on startup.
- The app needs Postgres available for JPA-backed features.

## Architecture
- Main entrypoint: `src/main/java/com/example/aiqa/AiQaBackendApplication.java`.
- Server-rendered shell is `src/main/resources/templates/index.html`; it includes many page fragments and shows/hides sections client-side.
- Route wiring is duplicated in three places: `ViewController`, `templates/index.html`, and `static/js/app.js`. When adding or renaming a page route/section, keep all three in sync.
- Ignore the repo-root `templates/` directory for app changes; active Thymeleaf templates live under `src/main/resources/templates/`.

## Data Boundaries
- Chat endpoints under `/api/chat` use `InMemoryChatRepository`, so chat history is reset on restart and is not stored in Postgres.
- `/api/projects` and `/api/page-objects` are JPA-backed and hit Postgres.

## Tests
- Current automated coverage is only `ChatControllerTest` and `ChatServiceTest`; there are no tests yet for the JPA-backed project/page-object flows.
- Playwright files under `.playwright_test/` target `http://localhost:8081` and are ad hoc local browser checks, not part of the Maven test suite.

## Workflow Notes
- Repo-local workflow guidance lives in `.commands/workflow.md`; it says feature work should go through `dev`, with `CHANGELOG.md` updated before pushes. Check the current branch instead of assuming the checkout already matches that flow.
