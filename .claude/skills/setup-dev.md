---
name: setup-dev
description: Set up complete development environment for AIQA project
---

Set up the complete development environment for the AIQA project.

## What happens:

1. Checks Java version (requires Java 17+)
2. Verifies Maven installation
3. Checks Node.js version for Playwright sandbox (requires 18+)
4. Starts PostgreSQL database container
5. Installs Maven dependencies
6. Installs Playwright browsers
7. Installs Node.js dependencies for sandbox
8. Verifies database connection
9. Runs initial compilation
10. Runs tests to verify setup

## Prerequisites:

- Java 17 or higher
- Maven 3.6+
- Node.js 18+ 
- Docker and Docker Compose
- Git

## Usage:

```
"Set up development environment"
```

## Manual Steps (if automation fails):

```bash
# Check Java version
java -version

# Check Maven version  
mvn -version

# Check Node.js version
node -version

# Start database
docker-compose up -d

# Install dependencies
mvn clean install

# Install Playwright browsers
mvn exec:java -Dexec.mainClass="com.microsoft.playwright.CLI" -Dexec.args="install"

# Install sandbox dependencies
cd playwright-runner && npm install && cd ..

# Run tests
mvn test

# Start application
mvn spring-boot:run
```

## Troubleshooting:

- **Port 8081 in use**: Kill process using `netstat -ano | findstr :8081` then `taskkill /PID <pid> /F`
- **PostgreSQL connection failed**: Ensure docker-compose is running with `docker-compose ps`
- **Playwright browsers missing**: Run the install command again
- **Maven dependencies fail**: Delete `target/` directory and try again

## Verification:

After setup, you should be able to:
- Access application at http://localhost:8081
- Connect to PostgreSQL at localhost:5432
- Run all tests successfully
- Use Playwright browser automation features
