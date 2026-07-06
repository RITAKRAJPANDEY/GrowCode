

-- tables which we are going to create 
--1> users table 
--2> tasks table 
--3> metrices table
--4> refreshtoken table 


-- users table

CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL DEFAULT 'user' ,
    email TEXT NOT NULL UNIQUE,
    username TEXT  NOT NULL UNIQUE,
    password TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


--users table constraints and indexes

--if not using generilization
CREATE UNIQUE INDEX idx_user_username ON users(username); 

CREATE UNIQUE INDEX idx_lower_user_username ON users(LOWER(username));


CREATE EXTENSION IF NOT EXISTS pgcrypto;


INSERT INTO users (id, role, email, username, password) 
VALUES (
    'fe143657-3199-4e3e-9ac7-a1a44fef5f0f',             
    'admin',                                            
    'admin@growcode.com',                               
    'password',                                            
    crypt('username', gen_salt('bf', 12))   
) 
ON CONFLICT (username) DO NOTHING;



--refreshtoken table 

CREATE TABLE refreshtoken(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NUll,
refresh_hash TEXT NOT NUll,

expires_at TIMESTAMPTZ DEFAULT NOw()+INTERVAL '31 days',
is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
revoked_at TIMESTAMPTZ ,
replaced_by UUID ,

created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
created_by_ip TEXT,
user_agent TEXT
);

--refreshtoken constraints and indexes

ALTER TABLE refreshtoken ADD CONSTRAINT fk_refreshtoken_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE;



--Tasks Table 

CREATE TABLE tasks(

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE DEFAULT CURRENT_DATE,

    user_id UUID NOT NULL,
    workout BOOLEAN NOT NULL DEFAULT FALSE,
    commits INT NOT NULL DEFAULT 0,
    dsaq INT NOT NULL DEFAULT 0,
    
   

    platform VARCHAR(50), -- e.g., 'cf', 'lc'
    project VARCHAR(255),
    description TEXT,
    
    

    other1 VARCHAR(255),
    other2 VARCHAR(255),
    created_at TIMESTAMPTZ NOT NUll DEFAULT NOW()
);
ALTER TABLE tasks ADD CONSTRAINT fk_tasks_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

CREATE UNIQUE INDEX idx_tasks_date_user_id ON tasks(user_id,date);
CREATE UNIQUE INDEX idx_tasks_user_id_id ON tasks(user_id,created_at DESC,id DESC);
ALTER TABLE tasks ADD COLUMN feedback INTEGER;
ALTER TABLE tasks ADD COLUMN score INTEGER;