#DONE

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

## Files involved (new/existing)

- Existing: `poetry-frontend/src/shared/http/fetchClient.ts`
- Existing: `poetry-frontend/src/shared/http/httpTypes.ts`
- Existing: `poetry-frontend/src/shared/http/idempotency.ts`
- Existing: `poetry-frontend/src/features/auth/api/authApi.ts`
- Existing: `poetry-frontend/src/features/auth/model/AuthTokensSchemas.ts`
- Existing: `poetry-frontend/src/features/auth/hooks/useLogin.ts`
- Existing: `poetry-frontend/src/features/auth/hooks/useRefresh.ts`
- Existing: `poetry-frontend/src/features/auth/hooks/useLogout.ts`
- Existing: `poetry-frontend/src/features/auth/hooks/useMe.ts`
- Existing: `poetry-frontend/src/features/auth/hooks/useAuthMutations.ts`
- Existing: `poetry-frontend/src/shared/security/tokenStorage.ts`
- Existing: `poetry-frontend/src/shared/i18n/errorMapper.ts`
- Tests:
  `poetry-frontend/src/tests/features/auth/hooks/useAuthMutations.test.tsx`
- Tests: `poetry-frontend/src/tests/features/auth/hooks/useMeQuery.test.tsx`
