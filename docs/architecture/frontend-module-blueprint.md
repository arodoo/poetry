/_ File: frontend-module-blueprint.md Purpose: Canonical frontend feature module
blueprint ensuring structural parity with backend DDD / Clean Architecture
principles and anti-drift standards between API (backend) and UI (frontend). All
Rights Reserved. _/

# Frontend Feature Module Blueprint

Applies to every UI feature (Auth, Users, Orgs, Themes, Fonts, etc.). No
deviation without an ADR. This file maps backend layers (Domain, Application,
Interfaces) to frontend layers (Model, API, Hooks/UI) to keep ubiquitous
language, validation, error semantics, headers (ETag, Idempotency-Key), and
versioning consistent.

## 0. High-Level Layer Mapping (Parity Matrix)

| Backend Layer           | Responsibility                          | Frontend Counterpart               | Notes                                                                               |
| ----------------------- | --------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| domain/<feature>        | Aggregates, value objects, invariants   | features/<feature>/model           | Zod schemas enforce invariants client-side (mirrors backend constructor validation) |
| application/<feature>   | Orchestrates use cases via ports        | features/<feature>/api + hooks     | API wrappers = ports; hooks = orchestrated use cases with caching                   |
| interfaces/v1/<feature> | REST controllers (DTO mapping, headers) | features/<feature>/api (transport) | Add/strip ETag, Idempotency-Key, map error codes -> i18n keys                       |
| infrastructure          | Persistence / external adapters         | shared/http + generated sdk        | Only shared/http owns fetch impl; generated sdk is read-only                        |
| config/<feature>        | Composition wiring                      | features/<feature>/index.ts        | Re-export public surface + route registration                                       |

## 1. Directory & Naming

```
src/features/<feature>/
  model/        (types, value objects, zod schemas, mappers)
  api/          (SDK wrapper functions: pure, no React; adds headers, zod)
  hooks/        (React Query hooks: use<Verb><Noun>[Query|Mutation])
  components/   (presentational only; no business logic)
  pages/        (route-level orchestration; delegates to hooks/components)
  routing/      (RouteObject + guards; locale-aware path builders)
  locales/      (i18n namespace: en.json, es.json ...; mirrors backend keys)
  index.ts      (public surface: exports model types, hooks, route config)
```

Shared (cross-cutting):

- `src/ui/` design system (atoms/molecules only)
- `src/shared/` (NOTE: previously named in docs as core) containing:
  - `config/` (env schema)
  - `i18n/` (initialization, language detector)
  - `date/` (central date/time util – to add)
  - `http/` (fetch client, retry, timeout, header injection)
  - `routing/` (top-level route assembly + guards)
  - `sdk/` (generated OpenAPI client – never edited manually)
  - `query/` (QueryClient factory, defaults – to add)
- `src/routes/` aggregate feature routes (imports each feature routing entry)

Naming Rules:

- Files ≤ 80 lines; split mappers, schema fragments early.
- React hooks: `use<Verb><Noun>Query`, `use<Verb><Noun>Mutation`.
- API wrapper functions: `<verb><Noun>` (camelCase) returning domain model or
  DTO union.
- Zod schemas suffixed `Schema`; parsed types use `z.infer<typeof XSchema>`
  exported as `X`.
- No abbreviations (e.g. `configuration` not `cfg` in public types; local
  internal vars may use `cfg` when obvious).

## 2. Responsibilities (Extended)

| Folder     | Must Do                                                                                                            | Must NOT Do                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| model      | Define Zod schemas; refine; map backend DTO -> model; pure                                                         | Import React; perform side effects; call network                 |
| api        | Call generated SDK or shared/http/fetchClient; add headers (ETag, If-Match, Idempotency-Key); runtime validation; map errors to typed objects | Use raw fetch/axios; Use React Query; touch UI state; access window/document directly |
| hooks      | Compose queries/mutations; cache strategy (staleTime, gcTime); derive optimistic updates                           | Contain complex parsing (move to model); manipulate raw fetch; call SDK directly (use api/ layer)    |
| components | Pure render; local ephemeral UI state only; accessibility semantics                                                | Call sdk/api directly; embed business rules; use fetch          |
| pages      | Route params parsing, error & loading orchestration, layout slots                                                  | Contain validation logic; manual fetch; call SDK directly        |
| routing    | Provide `RouteObject`; guard composition; locale prefix enforcement                                                | Business logic or data fetching                                  |
| locales    | Provide keys referencing backend i18n (mirror naming)                                                              | Hardcode dynamic values (compose via interpolation instead)      |

## 3. Data & Network (Anti-Drift Enforcement)

**CRITICAL API Call Rules:**

1. **NEVER use raw `fetch()` or `axios` in feature code**
2. **Primary**: Use generated SDK from `shared/sdk/` (auto-generated from OpenAPI at `docs/api/backend-generated/v1/openapi.yaml`)
3. **Fallback**: If endpoint NOT in SDK yet, use `shared/http/fetchClient.fetchJson()` which includes JWT authentication automatically
4. **Reference implementations**: Check `features/seller-codes/` and `features/users/` for correct patterns
5. **Migration path**: When using fetchJson, add TODO comment to migrate to SDK when OpenAPI spec includes the endpoint

Mandatory Headers / Behaviors:

- `If-Match`: Set on update/delete when entity includes `version` (string |
  number) property.
- `ETag`: Read from response headers; store (optionally) with cached entity;
  expose via model if needed.
- `Idempotency-Key`: Always set for create (UUID v4). Utility lives in
  `shared/http/`.

Validation Pipeline:

1. API wrapper receives raw sdk response.
2. Zod schema parses & transforms to model type.
3. On Zod error: throw `ValidationError` object with shape
   `{ kind: 'validation'; i18nKey: string; issues: ZodIssue[] }`.
4. Hooks catch & surface through error states; pages map to toast/alert using
   `error.i18nKey`.

Query Key Standards:

- Collections: `['<feature>', 'list']`
- Entity: `['<feature>', id]`
- Derived view: `['<feature>', 'search', criteriaHash]`
- Configuration/meta: `['<feature>', 'meta']`

Mutation Invalidation:

- On create/update/delete: invalidate base key `['<feature>']` (fan-out) OR
  targeted `queryClient.setQueryData` for optimistic merge.

Centralized QueryClient Defaults (add in `shared/query/queryClient.ts`):

```
export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 2, refetchOnWindowFocus: false },
    mutations: { retry: 0 }
  }
})
```

No Direct fetch/axios:

- **FORBIDDEN**: Raw `fetch()` or `axios` calls in features/** directories
- **ALLOWED**: Generated SDK from `shared/sdk/` (primary method)
- **ALLOWED**: `shared/http/fetchClient.fetchJson()` for endpoints not yet in SDK (with TODO to migrate)
- **ENFORCEMENT**: Lint rule should forbid raw fetch/axios outside of `shared/http/` layer
- **EXAMPLES**: See `features/seller-codes/api/` and `features/users/api/` for correct implementation patterns

## 4. Error & i18n Strategy

Error Object Shapes (discriminated unions):

```
type DomainError = { kind: 'domain'; i18nKey: string; meta?: Record<string,unknown> }
type NotFoundError = { kind: 'not-found'; i18nKey: string; resource: string; id: string }
type ConflictError = { kind: 'conflict'; i18nKey: string }
type ValidationError = { kind: 'validation'; i18nKey: string; issues: ZodIssue[] }
type NetworkError = { kind: 'network'; i18nKey: 'error.network.unavailable'; status?: number }
```

Mapping Guidelines:

- HTTP 404 -> NotFoundError (i18n key mirrors backend
  `error.<resource>.not-found`).
- HTTP 409 -> ConflictError.
- 400 w/ validation details -> ValidationError.
- Others 5xx -> NetworkError (generic) unless backend supplies structured
  ProblemDetail with `errorCode` -> map to DomainError.

All visible text & aria labels: `t('<feature>:path.key')`. No inline strings.

## 5. Accessibility & Styling

- Every interactive component provides keyboard access (Tab, Shift+Tab) and ARIA
  roles.
- Modal / dialog components enforce focus trap & return focus.
- Tailwind only; tokens from config (no raw color literals, px for spacing,
  etc.).
- Dark mode: root class toggle; components rely on semantic classes (e.g.
  `bg-surface` if custom mapping layer added later).

## 6. Testing (Negative Path Parity with Backend)

Minimum Test Matrix per Feature:

- model: valid parse + each validation rule failure asserts expected i18n key.
- api: success mapping; header inclusion (ETag, Idempotency-Key); 404 ->
  NotFoundError; 409 -> ConflictError; validation failure -> ValidationError.
- hooks: query key correctness; cache invalidation after mutation; error state
  propagation.
- components: rendering with sample data; accessibility (axe / testing-library
  jest-axe) for key components.
- pages: integration (route params -> hook calls -> rendered states) incl.
  not-found & loading skeleton.

Line Limits:

- Source files ≤ 80 lines (enforced by CI script).
- Test files ≤ 40 lines; split helpers (`testUtils.ts`) for reuse.

Naming Patterns:

- Negative tests start with `when` / `givenInvalid` / end with `ShouldShowError`
  for CI detection.

## 7. Feature Implementation Checklist

1. Model types + Zod schemas (+ negative parse tests)
2. API wrapper(s) (headers + validation + mapping tests)
3. Hooks (queries & mutations) with stable keys
4. Components (presentational) with a11y
5. Pages + routing entry (locale prefix) + guard(s) if needed
6. Locales namespace + translations referencing backend keys
7. Added to aggregate routes + nav metadata
8. Domain doc updated: `docs/domains/<feature>.md`
9. OpenAPI path referenced in domain doc
10. ETag + version handling (if versioned resource)
11. Idempotent create (header set & tested)
12. Tests (model, api, hooks, UI, negative paths)
13. Task file updated (expected vs actual) per global instructions

## 8. Governance & Enforcement

Automated Rules (CI / Lint / Scripts):

- Forbid `fetch` / `axios` use outside `shared/http` or generated sdk (ESLint
  custom rule).
- Forbid importing generated sdk outside `features/*/api` or `shared/sdk`
  re-export.
- Enforce locale-prefixed route regex: `^/:locale/` for all leaf page paths.
- Scan for inline strings in feature components/pages (basic i18n enforcement:
  must call `t(` or use `<Trans>`).
- Check file length thresholds; fail if exceeded.
- Detect missing header comments.
- Query key pattern audit: `use.*Query` must return `queryKey` starting with
  feature slug.
- Negative test presence: at least one `when.*` or `.*ShouldShowError` per
  feature test folder.

Manual Review Checklist (PR Template Snippet):

- [ ] No business logic in components
- [ ] All new endpoints have API wrapper + schema parse
- [ ] ETag / If-Match applied where resource version present
- [ ] Idempotency-Key on create
- [ ] Query keys stable & namespaced
- [ ] i18n keys mirror backend (no stray strings)
- [ ] Tests include negative cases
- [ ] Docs + domain file updated

## 9. Observability & Diagnostics (Future Enhancements)

- Add lightweight client event logger (debug mode) for API call durations.
- Surface correlation/request ID from response headers (if backend adds) and
  attach to error objects.

## 10. Roadmap / Adoption Steps

Phase 1 (Scaffold): Introduce `features/` base folders, shared query client,
date util, error types file. Phase 2 (Enforcement): Add ESLint custom rules +
file length check script + query key auditor. Phase 3 (Refinement): Add
automated negative test ratio reporting analogous to backend. Phase 4
(Observability): Add request timing + correlation id propagation.

## 11. Appendix: Suggested Support Files

```
src/shared/query/queryClient.ts
src/shared/date/date.ts            (central date/time helpers)
src/shared/http/headers.ts         (build standard headers)
src/shared/errors/errors.ts        (error type definitions + guards)
src/features/<feature>/model/<Feature>Schemas.ts
src/features/<feature>/api/<feature>Api.ts
src/features/<feature>/hooks/use<Feature>Queries.ts
```

End of blueprint.
