---
name: database
description: Database operations for PostgreSQL
---

Manage PostgreSQL database operations for the AIQA project.

## Available Operations:

### Start/Stop Database
```bash
# Start PostgreSQL container
docker-compose up -d

# Stop PostgreSQL container  
docker-compose down

# View database logs
docker-compose logs aiqa-postgres

# Restart database
docker-compose restart aiqa-postgres
```

### Database Connection
- **Host**: localhost
- **Port**: 5432
- **Database**: aiqa
- **Username**: postgres
- **Password**: postgres
- **URL**: jdbc:postgresql://localhost:5432/aiqa

### Schema Management
```bash
# View current schema
psql -U postgres -d aiqa -c "\dt"

# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d

# Run schema initialization
# Schema is auto-created via JPA ddl-auto=update
# Manual schema available in: src/main/resources/schema.sql
```

### Database Backup/Restore
```bash
# Backup database
docker exec aiqa-postgres pg_dump -U postgres aiqa > backup.sql

# Restore database
docker exec -i aiqa-postgres psql -U postgres aiqa < backup.sql

# Copy backup from container
docker cp aiqa-postgres:/var/lib/postgresql/data ./pg-data-backup
```

### Common Issues

**Connection refused:**
- Ensure PostgreSQL is running: `docker-compose ps`
- Check port 5432 is not blocked
- Verify credentials in application.properties

**Schema not updating:**
- Restart application after schema.sql changes
- Check JPA ddl-auto setting in application.properties
- Review Hibernate SQL logs: set `spring.jpa.show-sql=true`

**Performance issues:**
- Check connection pool size in HikariCP settings
- Analyze slow queries with PostgreSQL EXPLAIN
- Consider adding indexes to frequently queried columns

## Usage:

```
"Start database"
"Stop database" 
"Backup database"
"Check database status"
```

## Notes:

- Database data persists in Docker volume: `aiqa_data`
- JPA handles schema automatically with `ddl-auto=update`
- For production, use `ddl-auto=validate` and manual migrations
- Connection pooling managed by HikariCP (Spring Boot default)
