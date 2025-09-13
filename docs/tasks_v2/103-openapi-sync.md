# File: 103-openapi-sync.md

# Purpose: Align `openapi-v1.yaml` to actual endpoints and error schema.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Add `/api/v1/auth/*` and admin/user endpoints if missing.
2. Add error components; reuse in responses.
3. Run spec linter; update hash check.
4. Contract tests to schemas.

## Acceptance

- Spec validated; contract tests green.
