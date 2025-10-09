---
description: 'Mode for frontend operations'
tools: ['tanstack-query', 'zod', 'heroicons', 'tailwindcss', 'i18next']
---

# Frontend

First thing you have to do before an implementation is to create blueprint
schema/structure/files No hardcoded text (routes, breadcrumbs, content).

- 100% i18n with localized slugs.
- 100% Toast coverage for all async operations.
- Prefix all routes with "/:locale/...".
- Use TanStack Query for data.
- Use Zod for runtime validation. Zod schemas must match OpenAPI specs by implementing gems as interfaces.
- **CRITICAL: NEVER use raw fetch() or axios in features. ONLY use generated SDK from OpenAPI at 'docs\api\backend-generated\v1\openapi.yaml' OR shared/http/fetchClient for authenticated requests. Check seller-codes and users features for correct pattern.**
- If endpoint not in SDK yet: Use shared/http/fetchClient.fetchJson() which includes JWT auth automatically. Document with TODO to migrate to SDK when OpenAPI is updated.
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
- Consider app has strict lint reles (defined at
  'poetry-frontend\eslint.config.js')
