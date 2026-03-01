# Mobile Core Architecture

## Overview

The mobile app (`poetry-mobile`) uses **Expo Router** for file-based
navigation with a core architecture of:

1. **Root layout** — bootstraps providers (Query, Auth, i18n)
2. **Auth context** — manages login state + JWT tokens
3. **Route guards** — Auth gates block unauthenticated access
4. **Protected routes** — `(app)` group for logged-in users

## Directory Structure

```
app/
  _layout.tsx              Root layout with providers
  index.tsx                Redirect to auth
  (auth)/
    _layout.tsx            Auth group (login screen) + gate
    login.tsx              Google Sign-In placeholder
  (app)/
    _layout.tsx            Protected routes + gate
    home.tsx               First protected screen

src/
  shared/
    auth/
      AuthContext.ts       useAuth hook + types
      AuthProvider.tsx     Context provider
      AuthGate.tsx         Route guard component
      tokenStorage.ts      SecureStore JWT management
    query/
      queryClient.ts       TanStack Query instance
    http/
      apiClient.ts         Axios + JWT interceptors
    i18n/
      index.ts             i18n initialization
      catalog/
        en/index.ts        English translations
        es/index.ts        Spanish translations
    config/
      env.ts               Zod-validated environment

  features/
    auth/
      locales/
        en.ts              English auth strings
        es.ts              Spanish auth strings
```

## Core Flows

### Authentication

1. User navigates to `/(auth)/login` (not blocked)
2. Clicks "Continue with Google"
3. `login()` from `useAuth()` saves JWT pair to SecureStore
4. AuthContext updates to `status: 'authenticated'`
5. AuthGate redirects to `/(app)/home`

### Route Protection

- **`/(auth)` group**: Uses `AuthGate requireAuth={false}`
  - Redirects authenticated users to `/(app)/home`
- **`/(app)` group**: Uses `AuthGate requireAuth={true}`
  - Redirects unauthenticated users to `/(auth)/login`

### API Calls

1. `apiClient.axios` auto-adds `Authorization: Bearer {token}`
2. On 401: `logout()` clears tokens + redirects to login
3. React Query caches responses with 30s staleness

## Files Created This Session

| File | Purpose | Lines |
|------|---------|-------|
| `app/_layout.tsx` | Root layout + providers | 35 |
| `app/index.tsx` | Root redirect | 8 |
| `app/(auth)/_layout.tsx` | Auth group + gate | 13 |
| `app/(auth)/login.tsx` | Google login screen | 50 |
| `app/(app)/_layout.tsx` | Protected group + gate | 13 |
| `app/(app)/home.tsx` | Protected home screen | 35 |
| `src/shared/auth/AuthContext.ts` | Auth state + types | 55 |
| `src/shared/auth/AuthProvider.tsx` | Context provider | 40 |
| `src/shared/auth/AuthGate.tsx` | Route guard | 25 |
| `src/features/auth/locales/en.ts` | English strings | 13 |
| `src/features/auth/locales/es.ts` | Spanish strings | 13 |
| `index.ts` | Expo Router entry | 1 |

## Development Commands

```bash
npm run dev              # Start with logging (from poetry-mobile)
npm run dev:raw         # Start without logging (direct Expo)
npm run check:mobile-build  # Run typecheck gate (from repo root)
npm run typecheck       # Full typecheck (from poetry-mobile)
npm run lint            # ESLint check
```

## Quality Gates

### Pre-Launch Checker

Before Expo starts, `tools/ci/mobile/check-mobile-build.mjs` runs
TypeScript compilation and aborts if errors exist (excluding
pre-existing e2e test type issues). This prevents broken code from
reaching Metro bundler.

**Trigger**: Automatic when running `npm run dev`

### Pre-Commit Hooks (Husky)

1. **File headers**: Name, 3+ sentence purpose, rights legend
2. **Line/character limits**: Max 60L/80C per file
3. **i18n strings**: No hardcoded UI text
4. **SDK sync**: Frontend SDK matches OpenAPI (also applies to mobile)
5. **ESLint**: `--max-warnings=0`
6. **Typecheck**: `tsc --noEmit`

## Debugging Issues

### Metro Can't Resolve Module

If you see `Unable to resolve "..."`:

1. Run `npm run check:mobile-build` to identify the exact error
2. Check import paths (use 4 levels `../../../../` from deep nesting)
3. Remove duplicate file extensions (keep only `.ts`, not `.ts` + `.json`)

### Build Errors in Log

`logs/mobile/mobile-dev.log` shows only errors, warnings, and
bundler messages (stripped of ANSI codes). Progress bars and QR
blocks are excluded to keep the log readable.

### QR Code Not Showing

The server runs in a pseudo-terminal (node-pty) so QR code renders
properly even though output is logged. If you don't see QR:

1. Check that Metro is not in an error state
2. Look at `logs/mobile/mobile-dev.log` for bundler errors
3. Restart server: Ctrl+C and `npm run dev` again
