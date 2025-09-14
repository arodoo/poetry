#FINISHED

# File: 100-backend-rbac.md

# Purpose: Apply RBAC to controllers with method security and tests.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Define roles enum mapping to authorities.
2. Enable method security; configure filter chain.
3. Add `@PreAuthorize` per endpoint.
4. Map JWT to authorities; fallback for anonymous.
5. MVC tests for 401/403.

## Acceptance

- Protected endpoints enforce roles; tests green.
