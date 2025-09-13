# File: 302-public-register.md

# Purpose: Implement Register page.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Form fields with Zod; submit to `/auth/register`.
2. Idempotency-Key header; success notice; redirect to `/login`.
3. Tests: validation, idempotency header present, i18n.

## Acceptance

- Register flow functional; tests pass.
