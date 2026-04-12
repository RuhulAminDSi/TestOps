-- AIQA Database Schema for PostgreSQL
-- Run this script to create the database

-- Create database (run separately)
-- CREATE DATABASE aiqa;

-- Connect to aiqa database first
-- \c aiqa

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Test Suites table
CREATE TABLE IF NOT EXISTS test_suites (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Test Cases table
CREATE TABLE IF NOT EXISTS test_cases (
    id BIGSERIAL PRIMARY KEY,
    suite_id BIGINT NOT NULL REFERENCES test_suites(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Test Executions table
CREATE TABLE IF NOT EXISTS test_executions (
    id BIGSERIAL PRIMARY KEY,
    suite_id BIGINT NOT NULL REFERENCES test_suites(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'running',
    passed_count INTEGER NOT NULL DEFAULT 0,
    failed_count INTEGER NOT NULL DEFAULT 0,
    duration_ms INTEGER,
    executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- API Collections table
CREATE TABLE IF NOT EXISTS api_collections (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- API Requests table
CREATE TABLE IF NOT EXISTS api_requests (
    id BIGSERIAL PRIMARY KEY,
    collection_id BIGINT NOT NULL REFERENCES api_collections(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    endpoint TEXT NOT NULL,
    headers JSONB,
    body TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_test_suites_project ON test_suites(project_id);
CREATE INDEX IF NOT EXISTS idx_test_cases_suite ON test_cases(suite_id);
CREATE INDEX IF NOT EXISTS idx_test_executions_suite ON test_executions(suite_id);
CREATE INDEX IF NOT EXISTS idx_api_collections_project ON api_collections(project_id);
CREATE INDEX IF NOT EXISTS idx_api_requests_collection ON api_requests(collection_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- Insert sample data
INSERT INTO users (username, email, password_hash, role) 
VALUES ('admin', 'admin@aiqa.com', '$2a$10$dummy', 'admin')
ON CONFLICT (username) DO NOTHING;