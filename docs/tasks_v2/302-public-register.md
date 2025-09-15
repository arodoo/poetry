# DONE

# File: 302-public-register.md

# Purpose: Implement Register page.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Form fields with Zod; submit to `/auth/register`.
2. Idempotency-Key header; success notice; redirect to `/login`.
3. Tests: validation, idempotency header present, i18n.

## Acceptance

- Register flow functional; tests pass.

Implementation notes:

- Implemented `public-register` feature using Zod validation and a typed
  `useRegister` hook.
- API wrapper ensures an `Idempotency-Key` header is set for requests (generated
  client-side when absent).
- Page uses shared `Input` and `Button` UI components and redirects to
  `/:locale/login` on success.

Test evidence:

- Frontend tests executed successfully: 91 tests passed locally.
