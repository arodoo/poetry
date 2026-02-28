# ADR 0001 — Locale priority: URL path segment over env default

| Field | Value |
|-------|-------|
| Status | Accepted |
| Date | 2026-02-28 |
| Branch | feat/user-profile-fields |

---

## Context

The app supports two locales (`en`, `es`). Routes are prefixed with the
locale: `/es/login`, `/en/dashboard`, etc.

Before this change, `useLocale` initialised its state with
`VITE_DEFAULT_LOCALE` (env var, `'en'`). Even when the user navigated to
`/es/login`, the page rendered in English until the async call to
`GET /api/v1/me/locale` completed.

On public pages (login, register, forgot-password) the backend call uses a
hardcoded `X-User-Id: demo` header and no auth token, so it frequently
returns 401. The error path fell back to `getDefaultLocale()` (`'en'`),
overriding the URL locale even after the async round-trip.

---

## Decision

**Locale is resolved in priority order:**

1. **URL path segment** (synchronous) — `getCurrentLocale()` reads
   `window.location.pathname` on component mount. This is the user's
   explicit signal and must be respected immediately.
2. **Backend preference** (async) — `GET /api/v1/me/locale` may override the
   URL locale only when it returns a valid locale successfully.
3. **Env default** (`VITE_DEFAULT_LOCALE`) — used only when the URL contains
   no recognisable 2-letter locale segment.

**On backend failure**, `loadUserLocale` falls back to `getCurrentLocale()`
(URL locale) rather than `getDefaultLocale()`. The env default is only used
if the URL itself carries no locale.

---

## Changes

| File | Change |
|------|--------|
| `shared/i18n/hooks/useLocale.ts` | `useState(getCurrentLocale())` instead of `getDefaultLocale()` |
| `shared/i18n/utils/localeLoader.ts` | Failure fallback: `getCurrentLocale() \|\| getDefaultLocale()` |

---

## Consequences

- **Positive** — zero locale flicker on page load. `/es/login` renders
  Spanish instantly, before any network request.
- **Positive** — unauthenticated pages (login, register, forgot-password)
  are no longer affected by backend call failures.
- **Neutral** — authenticated pages: if the backend fails and the URL
  locale differs from the stored preference, the URL wins until the next
  successful backend call. This is acceptable since the URL locale is the
  most recent user action.
- **Negative** — none identified.

---

## Alternatives Considered

| Option | Rejected because |
|--------|-----------------|
| Always use `VITE_DEFAULT_LOCALE` as init | Causes English flash on `/es/*` routes |
| Skip backend call on public routes | Larger change; backend call is still useful for authenticated users navigating without locale in URL |
| Persist locale in `localStorage` | Adds complexity; URL is already the canonical signal |
