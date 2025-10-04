# File: 00-scan-summary.md

# Purpose: Repo scan summary with implemented vs missing for backend and

# frontend to drive precise task creation. All Rights Reserved. Arodi Emmanuel

## Backend Implemented

- Auth: GET `/api/v1/auth/status`; POST `/api/v1/auth/login`, `/refresh`,
  `/logout`, `/register` (controllers present; service wiring not verified).
- Admin: POST echo under `/api/v1/admin` (controller + use case present).
- I18n: i18n resources exist; i18n controller at `/v1/i18n` (non `/api`).
- Users: `UserController` with list/get/create present (not in OpenAPI review).

## Backend Gaps

- RBAC annotations and security mapping not observed in controllers.
- Central `@ControllerAdvice` error/i18n handler not identified.
- Idempotency/ETag filters not found in code scan.
- OpenAPI alignment: ensure all paths above exist in `openapi-v1.yaml`.

## Frontend Implemented

- Routing registry with `routes.ts` containing `/`, `/demo`, `/admin/tokens`,
  `/unauthorized`.
- Guard: `RequireRole` implemented.
- Features: tokens feature with pages and tests; admin routing file exists but
  empty; authRoutes placeholder only.

## Frontend Gaps vs Mandatory Pages

- Public: missing `/login`, `/register`, `/forgot-password`,
  `/reset-password/:token`, `/verify-email/:token`, `/status`, `/404`.
- Authenticated: missing all pages: `/dashboard`, `/profile`, `/account/*`,
  `/onboarding`, `/help`, `/search`, `/notifications`.
- Admin & Manager: missing themes, zones, seller-codes, memberships,
  subscriptions, orgs scoped, imports/exports.
- Admin only: missing configuration, users, orgs new, billing, integrations,
  api-keys/webhooks, platform health/jobs.
