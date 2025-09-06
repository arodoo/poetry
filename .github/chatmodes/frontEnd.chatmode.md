---
description: 'Mode for frontend operations'
tools: ['tanstack-query', 'zod', 'heroicons', 'tailwindcss', 'i18next']
---

# Frontend

- No hardcoded text (routes, breadcrumbs, content).
- 100% i18n with localized slugs.
- Typos, interfaces, enums, etc, should be imported from backend, never declared
  manually.
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
