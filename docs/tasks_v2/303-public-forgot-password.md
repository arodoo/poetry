# DONE

# File: 303-public-forgot-password.md

# Purpose: Implement Forgot Password page.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Email form; submit to backend endpoint (stub if pending).
2. Show success toast; link back to login.
3. Tests: validation and success path.

## Acceptance

- Forgot flow UX complete; tests pass.

Implementation notes:

- Implemented `public-forgot-password` feature using Zod validation and a typed
  `useForgotPassword` hook.
- Page uses shared `Input` and `Button` UI components and redirects to
  `/:locale/login?forgot=success` on submit; login page shows a success notice.

Test evidence:

- Frontend tests executed successfully: 91 tests passed locally.
