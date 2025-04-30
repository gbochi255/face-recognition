DROP DATABASE IF EXISTS smart_brain;
CREATE DATABASE smart_brain;

\c smart_brain;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries INT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
);