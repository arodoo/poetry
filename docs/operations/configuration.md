<!--
File: configuration.md
Purpose: Documents typed configuration for frontend and backend, the
variables available, default values, and validation behavior. This page
covers injection patterns and references to OpenAPI paths.
All Rights Reserved. Arodi Emmanuel
-->
# Configuration — Typed and Validated

Overview
- Backend uses Spring Configuration Properties bound to `app.*` keys.
- Frontend validates `import.meta.env` using Zod at startup.

Backend variables (prefix `app.`)
- `api-base-path` (string, required) — Base path of API (e.g. `/api/v1`).
- `cors-allowed-origins` (csv, optional) — Allowed CORS origins.
- `idempotency-ttl-seconds` (int>=1) — TTL for Idempotency keys.
- `log-json` (boolean) — Enables compact JSON console logging.
- `http-connect-timeout-ms` (int>=1) — HTTP connect timeout in ms.
- `http-read-timeout-ms` (int>=1) — HTTP read timeout in ms.
- `http-retry-max-attempts` (int>=1) — Max retry attempts.
- `http-retry-backoff-ms` (int>=0) — Fixed backoff between attempts.

Frontend variables (Vite)
- `VITE_API_BASE_URL` (url, required) — Backend base URL.
- `VITE_LOG_LEVEL` (enum) — `debug|info|warn|error`.
- `VITE_FEATURE_AUTH` (boolean-string) — Feature flag for auth.
- `VITE_HTTP_TIMEOUT_MS` (int>=1, default `5000`) — Fetch timeout.
- `VITE_HTTP_RETRY_MAX_ATTEMPTS` (int>=1, default `3`) — Retries.
- `VITE_HTTP_RETRY_BACKOFF_MS` (int>=0, default `200`) — Backoff.

Validation behavior
- Backend: Application fails to start on invalid configuration.
- Frontend: App throws at boot preventing undefined behavior.

Injection patterns
- Backend: `AppConfigPort` is injected into beans that need HTTP
  client settings; `RetryTemplate` and `RestClient` are configured
  centrally in `AppConfigComposition`.
- Frontend: Import `env` from `src/shared/config/env.ts` and
  `fetchJson` from `src/shared/http/fetchClient.ts` to reuse settings.

References
- API base path: `/api/v1` — see `docs/api/openapi-v1.yaml`.
