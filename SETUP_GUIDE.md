# AIQA Project Setup Guide

Complete guide to set up and start developing with the AIQA project.

## 🚀 Quick Start

### 1. Prerequisites Check
```bash
# Verify Java 17+
java -version

# Verify Maven 3.6+
mvn -version

# Verify Node.js 18+
node -version

# Verify Docker
docker --version
docker-compose --version
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your actual API keys and configuration
# nano .env  # or your preferred editor
```

### 3. Database Setup
```bash
# Start PostgreSQL container
docker-compose up -d

# Verify database is running
docker-compose ps
```

### 4. Install Dependencies
```bash
# Install Maven dependencies
mvn clean install

# Install Playwright browsers
mvn exec:java -Dexec.mainClass="com.microsoft.playwright.CLI" -Dexec.args="install"

# Install Node.js dependencies for sandbox
cd playwright-runner && npm install && cd ..
```

### 5. Run Tests
```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=ChatServiceTest
```

### 6. Start Application
```bash
# Start Spring Boot application
mvn spring-boot:run

# Application will be available at http://localhost:8081
```

## 🛠️ Development Tools

### Claude Code Setup
The project includes comprehensive Claude Code configuration:

- **Skills**: `/git-push`, `/merge-master`, `/bug-fix`, `/setup-dev`, `/database`
- **Agents**: Code review, test runner
- **Hooks**: Pre-commit testing, auto-compilation

### VS Code Setup
Install recommended extensions:
```bash
# Open in VS Code
code .

# Install recommended extensions (will be prompted automatically)
```

### IDE Configuration
- **IntelliJ IDEA**: `.idea/` directory contains project settings
- **VS Code**: `.vscode/` directory contains settings and extensions

## 📋 Common Development Tasks

### Adding New Features
1. Create feature branch from dev
2. Implement changes
3. Run tests: `mvn test`
4. Use code review agent
5. Push to dev: `/git-push`

### Fixing Bugs
1. Identify and fix the issue
2. Document fix: `/bug-fix`
3. Run tests to verify
4. Push to dev: `/git-push`

### Database Operations
```bash
# Start database
/database start

# Stop database
/database stop

# Backup database
/database backup

# Check database status
/database status
```

### Testing
```bash
# Run all tests
/test

# Run specific test
mvn test -Dtest=ClassName

# Run tests with coverage
mvn test jacoco:report
```

## 🔧 Configuration Files

### Application Configuration
- `src/main/resources/application.properties` - Main Spring Boot config
- `.env` - Environment variables (create from `.env.example`)
- `pom.xml` - Maven dependencies and build config

### Database Configuration
- `docker-compose.yml` - PostgreSQL container setup
- `src/main/resources/schema.sql` - Database schema

### AI Provider Configuration
Configure AI providers in `.env`:
- `OPENAI_API_KEY` - OpenAI GPT-4
- `CLAUDE_API_KEY` - Anthropic Claude
- `OLLAMA_API_URL` - Local Ollama instance
- `OPENCODE_API_KEY` - Opencode AI

## 🚢 Deployment

### CI/CD Pipeline
The project includes GitHub Actions workflow (`.github/workflows/ci.yml`):
- Automated testing on push
- Security scanning
- Code quality checks
- Automated deployment to dev/master

### Manual Deployment
```bash
# Build package
mvn clean package

# The JAR will be in target/ directory
# Deploy to your server
scp target/*.jar user@server:/path/to/deploy
```

## 📚 Project Structure

```
aiqa/
├── src/main/java/com/example/aiqa/
│   ├── controller/     # REST API endpoints
│   ├── service/        # Business logic
│   ├── repository/     # Data access
│   ├── domain/        # Entity models
│   ├── dto/           # Data transfer objects
│   ├── config/        # Spring configuration
│   └── exception/     # Exception handling
├── src/main/resources/
│   ├── templates/     # Thymeleaf HTML pages
│   ├── static/        # CSS, JS assets
│   └── application.properties
├── src/test/          # Test files
├── playwright-runner/ # Node.js sandbox
├── .claude/          # Claude Code configuration
├── .github/          # GitHub workflows
├── .vscode/          # VS Code settings
└── memory/           # Persistent memory system
```

## 🐛 Troubleshooting

### Common Issues

**Port 8081 already in use:**
```bash
# Find process using port 8081
netstat -ano | findstr :8081  # Windows
lsof -i :8081                 # Linux/Mac

# Kill the process
taskkill /PID <pid> /F        # Windows
kill -9 <pid>                 # Linux/Mac
```

**PostgreSQL connection failed:**
```bash
# Check if container is running
docker-compose ps

# Restart container
docker-compose restart

# View logs
docker-compose logs aiqa-postgres
```

**Playwright browsers not found:**
```bash
# Reinstall Playwright browsers
mvn exec:java -Dexec.mainClass="com.microsoft.playwright.CLI" -Dexec.args="install"
```

**Maven dependency issues:**
```bash
# Clean and reinstall
mvn clean install -U

# Clear local repository cache if needed
rm -rf ~/.m2/repository/com/example/aiqa
```

## 📖 Additional Resources

- **CLAUDE.md**: Project-specific guidance for Claude Code
- **AGENTS.md**: Git workflow documentation
- **CHANGELOG.md**: Project changelog
- **.commands/workflow.md**: Detailed development workflow
- **.claude/README.md**: Claude Code configuration guide

## 🤝 Getting Help

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review error logs in `target/` directory
3. Check application logs for detailed error messages
4. Consult the documentation in the `memory/` directory
5. Use Claude Code skills for automated assistance: `/setup-dev`

## ✅ Setup Verification

After completing setup, verify everything works:

```bash
# 1. Database running
docker-compose ps

# 2. Application compiles
mvn compile

# 3. Tests pass
mvn test

# 4. Application starts
mvn spring-boot:run
# Visit http://localhost:8081

# 5. Claude Code configured
ls .claude/
# Should show skills/, agents/, settings.json, etc.
```

If all steps pass, your development environment is ready! 🎉
