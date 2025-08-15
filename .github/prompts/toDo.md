<!--
File: toDo.md
Purpose: Actionable ToDo plan to reconstruct oldRepo under new conventions.
All Rights Reserved. Arodi Emmanuel
-->
# ToDo — Reconstruction of oldRepo under new convention

1) Audit and alignment
- Review oldRepo/boops-site/api and app: endpoints, models, validations, errors, config.
- Map to DDD (back: domain/application/infrastructure/interfaces; front: domain/features/shared/ui).
- Inventory of inconsistencies (names, routes, contracts, validations, HTTP statuses, messages).

2) Backend (poetry-backend)
- DDD structure: domain (entities, VOs, repos), application (use cases, DTOs), infrastructure (JPA/HTTP/config), interfaces (REST).
- Routes under /api/v1; /api index; Actuator and JSON logs; restrict /actuator/mappings.
- RFC7807 global handler; soft delete; no silent catch.
- Timeouts and retries in HTTP/DB; typed env var validation at startup.
- OpenAPI at /v3/api-docs + Swagger UI.
- ETag/If-Match and Idempotency-Key where applicable.

3) OpenAPI ↔ SDK
- Export contracts to /docs/api; validate schema in CI.
- Generate TS SDK from OpenAPI; inject in frontend; no direct fetch.

4) Frontend (poetry-frontend)
- Routes "/:locale/..."; 100% i18n without hardcoded texts; localized slugs per feature.
- Features with locales dir; accessible UI (WCAG), Tailwind, @heroicons.
- Data with TanStack Query (stable keys/invalidation); Zod validation.
- Logic in hooks/services; central date/time util; ETag/Idempotency headers.

5) Tests and quality
- Back: unit (domain/app), integration (REST/repos), contract (OpenAPI).
- Front: unit (hooks/utils), integration (components with MSW), minimal e2e.
- Anti-drift: compare SDK↔OpenAPI and Zod↔types in CI.
- 60-line limit per file; refactor where exceeded.

6) CI and hooks
- Husky: pre-commit (lint+format+max-lines), pre-push (test+typecheck+build).
- Commitlint; pipeline fails on lint/tests/build, invalid OpenAPI, SDK/type drift.

7) Documentation (/docs)
- Structure: overview, architecture, domains, api, standards, operations, security.
- One file per domain in /docs/domains: scope, RFs, data model, API refs, permissions, acceptance criteria.
- Document env vars and reference OpenAPI.

8) Resolve inconsistencies
- Align names, status codes, models, validations, and messages.
- Map backend errors to friendly UI messages (no raw backend text).

9) Definition of Done
- OpenAPI at /v3/api-docs and /docs/api; SDK consumed in frontend.
- Expected pages ready, i18n and localized routes.
- Green tests and active hooks; Actuator+logs OK.
- No files >60 lines; docs complete.
