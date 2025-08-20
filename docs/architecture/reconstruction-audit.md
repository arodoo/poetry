<!--
File: reconstruction-audit.md
Purpose: Step 1 audit inventory and alignment notes for repository reconstruction.
All Rights Reserved. Arodi Emmanuel
-->

# Step 1 — Audit and Alignment

Reviewed sources

- Backend old: `oldRepo/boops-site/api` (controllers, DTOs, entities, repos,
  services, OpenAPI config, properties)
- Frontend old: `oldRepo/boops-site/app` (axios core, features/users, zod
  schemas, i18n, router)
- New backend: `poetry-backend` (skeleton)
- Docs: `oldRepo/boops-site/API_ENDPOINTS.md`, `docs/readme.md`

Backend — Current inventory

- Endpoints detected (no versioning yet):
  - Auth: POST `/api/auth/login`, POST `/api/auth/register`, POST
    `/api/auth/refresh`, POST `/api/auth/logout`
  - Users: GET `/api/users`, GET `/api/users/{id}`, PUT `/api/users/{id}`,
    DELETE `/api/users/{id}`, POST `/api/users` (admin)
- Controllers: `AuthController`, `UserController`
- DTOs: `LoginRequest`, `UserDto`, `UserUpdateDto`
- Domain: Entities `User`, `Role` with soft delete via `BaseEntity` +
  `@SQLDelete`
- Repos: `BaseRepository` (Active queries), `UserRepository`, `RoleRepository`
- Services: `UserService` (create/update/soft delete/restore, role resolution)
- Config: `OpenApiConfig`; `application.properties` (springdoc, jwt, DB,
  devtools)
- Observability: Actuator dependency present, no restriction policies visible
- Errors: `GlobalExceptionHandler` returns ad-hoc JSON, not RFC7807

Frontend — Current inventory

- API access: `core/api/axiosConfig.ts` with interceptors and refresh;
  `features/users/api/users.ts` uses axios directly
- Validation: Zod in `features/users/schemas/user.schema.ts`
- i18n: `features/users/locales/{en,es}.ts`
- Router: `routes/index.tsx` without `/:locale` prefix
- SDK from OpenAPI: missing

Inconsistencies with new conventions

- Versioning: missing `/api/v1` prefixes
- OpenAPI: property set to `/api-docs`; required `/v3/api-docs`
- RFC7807: missing; map exceptions to Problem Details
- API discovery: missing `/api` index; Swagger UI OK, validate path
- ETag/If-Match + Idempotency-Key: not implemented
- Observability: structured logs and restricted `actuator/mappings` missing
- Timeouts/retries for DB/HTTP: not configured
- Env vars: not typed/validated at startup
- Frontend: axios direct; must migrate to generated SDK
- Routes: missing `/:locale/...` and localized slugs
- Anti-drift (OpenAPI↔SDK, Zod↔Types): no tests
- 80-line limit: large files exceed (UserService ~241, AuthController ~194,
  OpenApiConfig ~138, axiosConfig.ts ~170)

DDD mapping (target)

- Backend
  - domain/user: entities, VOs, rules
  - application/user: ports (repositories), use cases
    (create/update/find/delete/restore)
  - infrastructure/jpa: persistence adapters, repo impls, mappings
  - interfaces/rest: controllers, DTOs, mappers, ProblemDetails handler
  - composition root: bean wiring and configuration
- Frontend
  - features/users: pages, hooks (React Query), services (SDK + Zod), locales,
    components (UI only)
  - shared: ui, utils (central date/time), i18n core

Immediate actions (for Step 2)

- Backend: move endpoints to `/api/v1/*`; add global `ProblemDetails`; set
  SpringDoc to `/v3/api-docs`; create `/api` index; configure Actuator and JSON
  logs; validate/env vars
- Frontend: define `/:locale` router prefix; prepare SDK client and replace
  axios in features; keep Zod
- CI: prepare Husky/commitlint hooks and OpenAPI/SDK verification

Definition of inventory done

- Endpoints and contracts extracted, domains/services/repos identified, risks
  and inconsistencies listed, DDD mapping defined
