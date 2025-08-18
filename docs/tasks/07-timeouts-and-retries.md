<!--
File: 07-timeouts-and-retries.md
Purpose: Task log for configuring timeouts and retries for DB/HTTP.
All Rights Reserved. Arodi Emmanuel
-->

# Task 07 — Timeouts and Retries

Description

- Configure conservative timeouts and limited retries for DB and HTTP clients.

Backend

- Added typed properties in `AppProperties` with validation.
- Exposed via `AppConfigPort` and `AppConfigAdapter`.
- Wired `RestClient` with `SimpleClientHttpRequestFactory` applying connect/read
  timeouts.
- Added `RetryTemplate` with fixed backoff.
- Defaults documented in `application.properties` and metadata.
- Fixed test context duplication and validated binding in
  `AppPropertiesValidationTest`.

Frontend

- Extended `env.ts` schema with HTTP timeout and retry settings, fail-fast
  validation.
- Implemented `fetchJson` wrapper with AbortController timeout and retry on 5xx.
- Added unit tests with Vitest.

How to use

- Backend: inject `RestClient` or `RetryTemplate` as needed.
- Frontend: `import { fetchJson }` and call `fetchJson('/users')`.

Status: Complete Last updated: 2025-08-17
