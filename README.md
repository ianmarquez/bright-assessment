# Bright Assessment

This project was made to adhere to Vault Consulting's hiring process for the position of full stack developer

## Tech Stack

- `Go`
- `React` with `Vite`
- `PostgreSQL`
- `Docker`

## Pre-requisites

1. You must have docker installed locally as this is a containerized application.

## Running the application

To run the application just run `docker compose up --build`

**!IMPORTANT** once app is running it wont't work as the database is not yet created. We only ran the database and haven't created the schema.
to create the schema you have 2 options. I will detail both ways to do it below;

### Using Goose

#### Pre-requisites:

1. You have to have go installed in your system
2. PostgreSQL container should already be running

#### Steps

1. Go to `./backend/`
2. run the command `go mod tidy` to install the backend dependencies
3. Go to `./backend/sql/schema` by doing `cd ./backend/sql/schema`
4. run the command `goose postgres postgres://postgres:1234@localhost:5432/referralbuilder up`
5. verify that the schema has been created by logging in to PostgreSQL connecting to localhost with password from step 4

### Doing it Manually

#### Pre-requisites:

1. PostgreSQL container should already be running
2. You have a GUI or TUI for running scripts in the database

#### Steps

1. Go to `./backend/`
2. Go to `./backend/sql/schema` by doing `cd ./backend/sql/schema`
3. Copy the content of the schema folder and run it manually based on file name index. ie(001 first then 002...)
4. verify that the schema has been created by logging in to PostgreSQL connecting to localhost

### Caveats/Code Smells

I have if you check the code, I have committed environment variables. This is fine for the purpose of this exam as everything is being ran locally and I have no intention of pushing this into production. This was done to make the testing/running of this application as smooth as possible for the checkers.
