# File: 201-frontend-auth-sdk-hooks.md

# Purpose: Implement SDK client and auth hooks (login/refresh/me/logout).

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Use OpenAPI types or SDK; add client adapter.
2. `useLogin`, `useRefresh`, `useMe`, `useLogout` with React Query.
3. Secure storage adapter; idempotency + ETag headers support.
4. Zod validation for responses; error mapping to i18n.
5. Tests with mocked client.

## Acceptance

- Hooks functional; tokens persisted; tests pass.
