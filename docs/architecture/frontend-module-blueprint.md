/_ File: frontend-module-blueprint.md Purpose: Canonical frontend module
blueprint for consistent React + TS architecture. All Rights Reserved. _/

# Frontend Feature Module Blueprint

Applies to every UI feature (Auth, Users, Orgs...). No deviation w/o ADR.

## 1. Directory & Naming

```
src/features/<feature>/
  model/        (types, value objects, zod schemas, mappers)
  api/          (SDK wrapper functions: pure, no React)
  hooks/        (React Query: use<Verb><Noun>)
  components/   (presentational only)
  pages/        (route-level orchestration)
  routing/      (RouteObject + guards)
  locales/      (i18n namespace: en.json, es.json ...)
  index.ts      (re-exports public surface)
```

Shared:

- src/ui/ design system
- src/core/ env, i18n, date util, queryClient, config
- src/sdk/ generated OpenAPI client (read-only)
- src/routes/ aggregate feature routes

## 2. Responsibilities

- model: Pure TS, no React. Schemas validate & transform.
- api: Wrap sdk; add headers (ETag, If-Match, Idempotency-Key); map to model.
- hooks: Compose api + React Query. Stable keys: ['<feature>', part, id?].
- components: Stateless or local UI state; all strings via i18n.
- pages: Parse params, call hooks, render components.
- routing: Locale prefixed '/:locale/...'; exports route array.
- locales: Keys mirror backend i18n.

## 3. Data & Network

- No fetch/axios outside sdk generation; only api/ calls sdk.
- Zod validation at api boundary; throw typed error (i18n key).
- Query key patterns:
  - Collections: ['<feature>','list']
  - Entity: ['<feature>',id]
  - Derived: ['<feature>','search',criteriaHash]
- Mutations: useCreate<Entity>Mutation etc; invalidate ['<feature>'].
- ETag: api adds If-Match on writes if entity.version present.
- Idempotency-Key: api sets header for create (uuid v4 util).

## 4. Error & i18n

- All user text t('<feature>:path.key'); never hardcoded.
- Errors propagate i18n keys; pages map to toast/alert.
- Route segments, titles, aria-labels from locales.

## 5. Accessibility & Styling

- Provide aria props passthrough; test keyboard nav.
- Focus trap + return on modals.
- Tailwind tokens only (no raw hex/px).
- Dark mode via class strategy (no inline colors).

## 6. Testing

- model: schema + mapper tests.
- api: mock sdk; assert headers + mapping.
- hooks: render with test QueryClient; assert keys & cache invalidation.
- components/pages: screen.\* queries; accessibility checks.
- Line limits: source <=80 lines; tests <=40; split early.

## 7. Feature Checklist

1 model types + zod schemas 2 api wrapper(s) 3 hooks (queries & mutations) 4
components 5 pages + routing entry 6 locales namespace + translations 7 a11y
review (landmarks, labels, focus) 8 tests (model, api, hooks, UI) 9
docs/domains/<feature>.md updated 10 OpenAPI path referenced 11 added to
aggregate routes + nav meta

## 8. Governance & Enforcement

- ESLint rule forbids fetch/axios in features.
- Lint blocks sdk imports outside api/.
- Script ensures '/:locale/' prefix in exported paths.
- CI checks file lengths & i18n usage.
- ADR required for new cross-cutting libs. End of blueprint.
