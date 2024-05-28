CREATE DATABASE finance_jwt;

/* uses the "uuid-ossp" extension, to install go to psql cli and type "create extension if not exists "uuid-ossp"" */
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_passwd VARCHAR(255) NOT NULL
);
-- Create the transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,                      
    text VARCHAR(255) NOT NULL,                 
    amount NUMERIC NOT NULL,                   
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
);