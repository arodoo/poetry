<!--
File: 04-port-auth-and-user-ddd.md
Purpose: Task log for porting Auth and User modules to DDD structure under /api/v1.
All Rights Reserved. Arodi Emmanuel
-->

> ### COMPLETED

# Task 04 — Port Auth and User to DDD

Description

- Move controllers/services/entities to DDD layers (domain, application,
  infrastructure, interfaces) and expose /api/v1 endpoints.

Expected Result

- Clean ports/use-cases, JPA adapters, DTO mappers, soft-delete, tests, docs,
  OpenAPI contracts.

Actual Result

- Implemented.
- Auth: ports/use cases wired to in-memory adapter (stub) under DDD; REST at
  /api/v1/auth.
- User: ports/use cases wired to JPA adapter with soft-delete; REST at
  /api/v1/users.
- Global RFC7807 handler, API index, v1 health.
- Tests added for Auth and Users controllers and error handler; all under 60
  lines per file.
- Docs updated in /docs/domains and /docs/api. OpenAPI v1 to be expanded in
  later task.

Status: Done Last updated: 2025-08-17
