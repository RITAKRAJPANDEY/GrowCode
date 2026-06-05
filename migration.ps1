




Write-Host "🚀 Starting migration for project: $DB_NAME" -ForegroundColor Cyan

if ($db_exists -ne "1") {
    psql -U $DB_USER -h $HOST -p $PORT -d postgres -c "CREATE DATABASE $DB_NAME;"
    Write-Host " Database '$DB_NAME' created successfully." -ForegroundColor Green
} else {
    Write-Host " Database '$DB_NAME' already exists. Proceeding to table creation." -ForegroundColor Blue
}


$MIGRATION_SQL = @"
-- Enable UUID extension just in case
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------
-- USERS TABLE
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL DEFAULT 'user',
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_lower_user_username ON users(LOWER(username));

-- ----------------------------------------
-- REFRESH TOKEN TABLE
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS refreshtoken (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    refresh_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '31 days',
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at TIMESTAMPTZ,
    replaced_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by_ip TEXT,
    user_agent TEXT
);

-- Add Foreign Key if it doesn't exist
DO \$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_refreshtoken_user_id') THEN
        ALTER TABLE refreshtoken ADD CONSTRAINT fk_refreshtoken_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END \$$;

-- ----------------------------------------
-- TASKS TABLE
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE DEFAULT CURRENT_DATE,
    user_id UUID NOT NULL,
    workout BOOLEAN NOT NULL DEFAULT FALSE,
    commits INT NOT NULL DEFAULT 0,
    dsaq INT NOT NULL DEFAULT 0,
    platform VARCHAR(50),
    project VARCHAR(255),
    description TEXT,
    other1 VARCHAR(255),
    other2 VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add Foreign Key if it doesn't exist
DO \$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_tasks_user_id') THEN
        ALTER TABLE tasks ADD CONSTRAINT fk_tasks_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END \$$;

-- Composite Unique Index for user tasks per day
CREATE UNIQUE INDEX IF NOT EXISTS idx_tasks_date_user_id ON tasks(user_id, date);
"@

# 3. Execute Schema Migration against the new database
Write-Host "Running table migrations inside '$DB_NAME'..." -ForegroundColor Yellow

# Pass the SQL script via pipeline to psql
$MIGRATION_SQL | psql -U $DB_USER -h $HOST -p $PORT -d $DB_NAME
