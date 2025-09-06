<!--
File: 07-timeouts-and-retries.md
Purpose: Task log for configuring timeouts and retries for DB/HTTP.
All Rights Reserved. Arodi Emmanuel
-->

> ### COMPLETED

# Task 07 — Timeouts and Retries

Description

- Configure conservative timeouts and limited retries for DB and HTTP clients.

Backend

- Added typed properties in `AppProperties` with validation.
- Exposed via `AppConfigPort` and `AppConfigAdapter`.
- Wired `RestClient` with `SimpleClientHttpRequestFactory` applying connect/read
  timeouts.
- Added `RetryTemplate` with fixed backoff and do-not-retry for 4xx via
  `NonRetryableException`.
- Introduced application port `HttpClientPort` and infrastructure adapter
  `RestClientAdapter` wired in `HttpComposition` so all outbound HTTP uses
  centralized timeout/retry.
- Evidence:
  - `poetry-backend/src/main/java/.../infrastructure/config/AppProperties.java`
  - `poetry-backend/src/main/java/.../config/AppConfigComposition.java`
  - `poetry-backend/src/main/java/.../config/HttpComposition.java`
  - `poetry-backend/src/main/java/.../application/common/http/HttpClientPort.java`
  - `poetry-backend/src/main/java/.../application/common/http/NonRetryableException.java`
  - `poetry-backend/src/main/java/.../infrastructure/http/RestClientAdapter.java`

Frontend

- Extended `env.ts` schema with HTTP timeout and retry settings, fail-fast
  validation.
- Implemented `fetchJson` wrapper with AbortController timeout and retry on 5xx.
- Evidence:
  - `poetry-frontend/src/shared/config/env.ts`
  - `poetry-frontend/src/shared/http/timeout.ts`
  - `poetry-frontend/src/shared/http/clientCore.ts`
  - `poetry-frontend/src/shared/http/fetchClient.ts`

How to use

- Backend: inject `HttpClientPort` in services to perform outbound HTTP with
  central policies.
- Frontend: `import { fetchJson }` and call `fetchJson('/users')`.

Status: Complete  
Last updated: 2025-08-20
