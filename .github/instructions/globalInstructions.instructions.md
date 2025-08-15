---
applyTo: '**'
---

- Must follow DDD, SOLID, Clean Architecture.
- Folder structure must follow DDD.
- No file should exceed 60 lines; if longer, split.
- Check file sizes by reading them (no shell commands).
- All code must be documented in /docs following the standard folder structure (overview, architecture, domains, api, standards, operations, security).
- Each module must have its own file in /docs/domains/ including: scope, RFs, data model, API references, permissions, and acceptance criteria.
- API contracts (OpenAPI) must live in /docs/api/ and be referenced from domain docs.


Frontend

- No hardcoded text (routes, breadcrumbs, content).
- 100% i18n with localized slugs.
- Prefix all routes with "/:locale/...".
- Use TanStack Query for data.
- Use Zod for runtime validation.
- Use SDK generated from OpenAPI (no direct fetch/axios in components).
- Each feature must have a dedicated folder 'locales' with i18n (it's own language definitions).
- Page components must only use pre-defined UI components from app/src/ui/ (e.g., Button.tsx, Table.tsx) so visual changes are made in one place and apply across the app.
- All UI must be fully accessible (WCAG 2.1 AA).
- No business logic inside UI components; keep logic in hooks/services.
- API endpoints must be idempotent where applicable.
- @heroicons/react for icons.
- Tailwind CSS for styling.
- respect rules at poetry-frontend\tsconfig.app.json and poetry-frontend\eslint.config.js.

Backend

- Versioned API base path: "/api/v1".
- Observability: Actuator, structured logs.
- API discovery:
  - OpenAPI at "/v3/api-docs".
  - Swagger UI.
  - "/api" index.
  - "/actuator/mappings" restricted.
- Error responses must follow RFC 7807 (Problem Details).
- Soft delete for entities; no hard deletes.
- No silent catches; all errors must be logged or reported.
- All external calls (HTTP/DB/Queue) must have timeouts and retries configured

Front/Back anti-drift

- OpenAPI → SDK (no direct fetch/axios).
- Zod at runtime.
- React Query with stable/invalidated keys.
- ETag + If-Match and Idempotency-Key.
- v1 additive only (breaking → v2).
- No hardcoded URLs.
- No direct date/time manipulation; use a centralized date/time utility.

CI

- Husky:
  - pre-commit: lint + format + max-lines.
  - pre-push: test + typecheck + build.
- Commitlint.
- CI fails on:
  - lint/tests/build failure.
  - Invalid OpenAPI.
  - SDK/type mismatch.
- Abstractions over implementations:
  - Define ports/interfaces in Domain/Application and depend only on them (DIP).
  - Adapters live in Infrastructure.
  - No direct imports of 3rd-party libs (HTTP/DB/SDK) outside Infrastructure.
  - Wiring only in a composition root via constructor injection.
- Use design patterns and follow international standards.
  Before starting code changes
- Provide a brief step-by-step plan.

Limits

- No over-engineering.
- No premature optimization.
- No direct error messages from backend to UI; map to localized user-friendly messages
- Avoid static singletons; prefer dependency injection.
- All env vars must be typed, validated at startup, and documented
