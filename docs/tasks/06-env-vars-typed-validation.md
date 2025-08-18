<!--
File: 06-env-vars-typed-validation.md
Purpose: Task log for typed and validated environment variables at startup.
All Rights Reserved. Arodi Emmanuel
-->

# Task 06 — Env Vars Typed Validation

Description

- Centralize env schema, validate on startup, document variables.

Expected Result

- Fail-fast on invalid config; config object injectable; docs updated.

Actual Result

- Backend: Added `AppProperties` + `@ConfigurationProperties` with validation;
  `AppConfigPort` and adapter; CORS wired via config; defaults in
  `application.properties`; tests for binding/validation.
- Frontend: Added Zod-based `env` config; declared Vite env types.
- Docs: `docs/operations/configuration.md` created.

Status: Completed Last updated: 2025-08-17 Links

- Backend config: ../../poetry-backend/src/main/java/com/poetry/poetry_backend
- Frontend env: ../../poetry-frontend/src/shared/config/env.ts
- Docs: ../operations/configuration.md
