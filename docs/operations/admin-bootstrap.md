# Admin Bootstrap

This document explains the small startup runner added to the backend which
ensures a default admin user exists by calling the public register API when the
application starts.

Location

- Java:
  `poetry-backend/src/main/java/com/poetry/poetry_backend/infrastructure/startup/AdminBootstrap.java`

Behavior

- On `ApplicationReadyEvent` the component posts to `/api/v1/auth/register`.
- If the user already exists (409) the bootstrap logs and continues.
- Any other error is logged but won't stop the application.

Configuration (overridable via environment or application.properties)

- `admin.bootstrap.username` (default: `admin`)
- `admin.bootstrap.email` (default: `admin@example.com`)
- `admin.bootstrap.password` (default: `ChangeMe123!`)
- `admin.bootstrap.base-url` (default: `http://localhost:8080`)

How to run

1. Start the application normally (e.g.
   `./mvnw -f poetry-backend/pom.xml spring-boot:run`).
2. Watch the application logs for `AdminBootstrap:` entries.

How to test manually

1. Stop the application.
2. Clear the user data (if using an in-memory DB or test DB) so the user does
   not exist.
3. Start the application and confirm a POST to `/api/v1/auth/register` is made
   and the user is created.
4. Start the application again and confirm the bootstrap logs that the admin
   already exists (handles idempotency).

Security note

- The default password is intentionally simple for local development; set a
  secure password in env vars or secret manager in production and restrict who
  can read environment variables or service logs.
