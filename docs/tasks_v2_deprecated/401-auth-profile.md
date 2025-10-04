#DONE

# File: 401-auth-profile.md

# Purpose: Implement `/profile` page.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Profile display and edit form; Zod validation.
2. Load current user from `useMe`; save endpoint stub if needed.
3. Tests: render/edit flows and i18n.

## Acceptance

- Profile page works; tests pass.

## Files involved (new/existing)

- New: `poetry-frontend/src/features/profile/pages/ProfilePage.tsx`
- New: `poetry-frontend/src/shared/routing/lazyAdapters/profileAdapter.ts`
- Existing: `poetry-frontend/src/routesAuthenticated.tsx`
- Existing: `poetry-frontend/src/shared/i18n/catalog/en/route/route.ts`
- Existing: `poetry-frontend/src/shared/i18n/catalog/es/route/route.ts`
- Test: `poetry-frontend/src/tests/features/profile/pages/ProfilePage.test.tsx`
