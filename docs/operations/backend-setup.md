<!--
File: backend-setup.md
Purpose: Backend setup summary and pending actions for Step 2.
All Rights Reserved. Arodi Emmanuel
-->

# Backend setup (Step 2)

Changes applied

- Versioning and discovery: `/api` index, `/api/v1/health`.
- RFC7807: `GlobalProblemHandler` with standard ProblemDetail.
- OpenAPI: runtime at `/v3/api-docs` and Swagger UI at `/swagger-ui.html`.
- Actuator: expose `health,info,metrics`; restrict `mappings`.
- Logging: basic JSON console pattern.
- OpenAPI snapshot saved: `docs/api/openapi-v1.yaml` (see Task 02).

Immediate pending

- Port controllers from oldRepo to `/api/v1/*` and split by DDD
  (interfaces/application/domain/infrastructure).
- Add ETag/If-Match and Idempotency-Key to idempotent endpoints.
- Typed env var validation at startup.
- Timeouts/retries for DataSource/HTTP.
