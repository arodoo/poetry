# UI Library

Scope: Token-driven, accessible, i18n-ready UI components. Frontend consumes
tokens from backend `/api/v1/tokens` via SDK. No business logic in UI
components.

- Tokens: themes (colors), font sizes, spacings, radius, shadows
- Provider: `TokensProvider` fetches tokens (React Query) and applies CSS vars
- Mapping: `src/ui/theme/tokens.ts` converts bundle to CSS variables
- i18n: All text via `useT()` keys under `ui.*`
- Accessibility: Components must follow WCAG 2.1 AA

Acceptance Criteria:

- No direct fetch in components; use SDK + feature API wrappers
- Locale-prefixed routing where applicable
- CSS variables applied at runtime and customizable per backend selection
