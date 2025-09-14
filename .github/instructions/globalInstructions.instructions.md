---
applyTo: '**'
---

Application will sooner or later be PWA, consider this in your designs.

- Don't stop coding until the task is fully complete if the plan is clear
- All code contributions must be production ready: fully implemented, no TODO,
  FIXME, or commented-out code, but app is in a fresh/initial state of
  development
- Before starting code changes Provide a brief step-by-step plan (in the chat
  only)
- Must follow DDD, SOLID, Clean Architecture
- Every variable, parameter, or attribute must have a descriptive name that
  clearly expresses its purpose in context (e.g. `response` instead of `r`, if
  you find a bad example, fix it)
- Code must be in first place LOGIC in relation to the environment
- IMPORTANT: No file should exceed 60 lines; (test files < 40 lines>), in
  frontEnd no line should exceed 80 characters, in backend is 100,
  (fixtures/helpers/components, etc)
- Code must follow international formatting standards: ESLint + Prettier for
  TypeScript, and Google Java Style Guide
- All features must be documented in /docs following the standard folder
  structure (overview, architecture, domains, api, standards, operations,
  security)
- Each module must have its own file in /docs/domains/ including: scope, RFs,
  data model, API references, permissions, and acceptance criteria
- API contracts (OpenAPI) must live in /docs/api/ and be referenced from domain
  docs.
- Vars, comments and code must be in English
- Every file must have a header comment, check 'tools\ci\check-headers.mjs'
- Give each feature a .md file in 'docs/' with the task description, the
  expected result, and the actual result and update after every modification.
  Check status of the files before start planning/coding
- Check file sizes by reading them (no shell commands)
- Use design patterns and follow international standards

  # BackEnd rules

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
- All DB operations must be handled by Hibernate/JPA. No direct SQL migrations.
- All external calls (HTTP/DB/Queue) must have timeouts and retries configured
- Lombok for boilerplate reduction.
- Java 21+.
- hashCode and equals for entities.
- @Deprecated files must be migrated and removed instantly.

BackEnd blueprint for new modules defined at:
'docs\architecture\module-blueprint.md' (Must be read if you will create new
modules or features in the backend) Database architecture blueprint defined at:
'docs\architecture\db-architecture-blueprint.md' (Must be read if you will
create or modify database tables or persistence models)

# FrontEnd rules

- No hardcoded text (routes, breadcrumbs, content).
- 100% i18n with localized slugs.
- Prefix all routes with "/:locale/...".
- Use TanStack Query for data.
- Use Zod for runtime validation.
- Use SDK generated from OpenAPI (no direct fetch/axios in components).
- Each feature must have a dedicated folder 'locales' with i18n (it's own
  language definitions).
- Page components must only use pre-defined UI components from app/src/ui/
  (e.g., Button.tsx, Table.tsx) so visual changes are made in one place and
  apply across the app.
- All UI must be fully accessible (WCAG 2.1 AA).
- No business logic inside UI components.
- API endpoints must be idempotent where applicable.
- @heroicons/react for icons.
- Tailwind CSS for styling.
- Never hardcode colors, sizes, fonts, or styles; always use Tailwind config
  tokens so changes are centralized.

FrontEnd blueprint for new modules defined at:
'docs\architecture\frontEnd-module-blueprint.md' (Must be read if you will
create new modules or features in the frontend)

## Front/Back anti-drift

- OpenAPI → SDK (no direct fetch/axios)
- Zod at runtime
- React Query with stable/invalidated keys
- ETag + If-Match and Idempotency-Key
- v1 additive only (breaking → v2)
- No hardcoded URLs
- No direct date/time manipulation; use a centralized date/time utility

  ## Testing & CI

- Test must reflect correct application behavior and not only simulate it.
- Husky.
- Abstractions over implementations:
  - Define ports/interfaces in Domain/Application and depend only on them (DIP)
  - Adapters live in Infrastructure
  - No direct imports of 3rd-party libs (HTTP/DB/SDK) outside Infrastructure
  - Wiring only in a composition root via constructor injection
  - In frontend test go at 'poetry-frontend\src\tests\<feature\>'
  - Backend test go at 'poetry-backend\src\test\<feature\>'

  ## Error Handling

- All errors should be explicitly handled or resolved in the code or tests
- Errors should never be suppressed, hidden, or ignored to reduce visibility
- No hardcoded error messages; use i18n keys for localization

## Commit musts

- For any git commit you propose or run: use exactly one -m with plain ASCII
  text in double quotes, formatted as type: subject (no scope), and NEVER
  include parentheses, semicolons, pipes, ampersands, backticks,
  dollar-substitution, or any other shell operators.
- Check .husky\commit-msg for commit message must

## Limits

- No over-engineering
- No premature optimization
- Avoid static singletons; prefer dependency injection
- All env vars must be typed, validated at startup, and documented
