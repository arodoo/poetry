#DONE

# File: 200-frontend-routing.md

# Purpose: Implement full route tree and layout shells with guards.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Define route objects for public/authenticated/admin/manager/admin-only.
2. Implement `RequireAuth`, `RequireRoles` wrappers using session.
3. Lazy-load pages; 404 handling.
4. Tests with MemoryRouter covering access control.

## Acceptance

- All routes wired with correct guards; tests pass.
