#!bin/bash

# Create Database
createdb deno_db --username=postgres

# Log in to database with psql
psql deno_db

# Create users table
create table if not exists users (
  user_id           TEXT NOT NULL PRIMARY KEY,
  full_name         VARCHAR(100) NOT NULL,
  user_name         VARCHAR(100) NOT NULL,
  email             TEXT NOT NULL UNIQUE,
  hashed_password   TEXT NOT NULL UNIQUE,
  created_at        DATE,
  updated_at        DATE
);

# Display users table
/d users

# Quite out of psql 
/q
