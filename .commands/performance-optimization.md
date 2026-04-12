# Performance Optimization Agent

## Areas to Optimize

### 1. Database
- **N+1 Queries**: Use JOIN FETCH,@EntityGraph
- **Missing Indexes**: Check WHERE, ORDER BY columns
- **Slow Queries**: Use EXPLAIN ANALYZE
- **Batch Operations**: Use batch inserts/updates

### 2. Java/Spring
- **Avoid**: String concatenation in loops
- **Use**: StringBuilder for string building
- **Cache**: @Cacheable for frequently accessed data
- **Lazy Loading**: Use wisely, consider fetch = FetchType.LAZY
- **Object Pooling**: Reuse expensive objects

### 3. API
- **Pagination**: Always paginate large datasets
- **Compression**: Enable gzip for responses
- **DTOs**: Use projection instead of full entities
- **Async**: Use @Async for long-running tasks

### 4. Frontend (if applicable)
- **Minify**: CSS/JS
- **Lazy Load**: Images, components
- **Debounce**: Search inputs
- **Memoization**: React useMemo/useCallback

## Commands

```powershell
# Profile with JProfiler or VisualVM
# Check slow queries in logs
# Run load test with k6 or JMeter
```

## Common Fixes in Spring Boot

```java
// Fix N+1
@Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.id = :id")
Optional<Order> findByIdWithItems(@Param("id") Long id);

// Add index
@Table(indexes = @Index(columnList = "created_at"))

// Cache
@Cacheable(value = "users", key = "#id")
public User findById(Long id) { ... }

// Async
@Async
public void sendEmail() { ... }
```

## Performance Checklist

- [ ] Database queries optimized (no N+1)
- [ ] Indexes on frequently queried columns
- [ ] Appropriate caching implemented
- [ ] Large lists paginated
- [ ] Lazy loading used correctly
- [ ] No memory leaks (close streams, resources)
- [ ] Log levels appropriate (no verbose logging in prod)