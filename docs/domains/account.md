<!--
File: account.md
Purpose: Domain documentation for account self-service (locale + password).
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Account

## Scope

Enable authenticated users to review and update self-service preferences such as
locale and password while enforcing policy constraints.

## Functional Requirements (RFs)

- View current locale and metadata for the authenticated user.
- Update locale with optimistic concurrency (ETag) support.
- Change password by verifying the current credential and enforcing policy.
- Emit toast-level feedback to the UI on success and validation failures.

## Data Model

| Aggregate             | Fields                       |
| --------------------- | ---------------------------- |
| AccountLocale         | locale (IETF tag), updatedAt |
| AccountPasswordChange | currentPassword, newPassword |

## API References

- `docs/api/openapi/paths/account-password.yaml`

## Permissions

- All endpoints require an authenticated principal (JWT access token).
- Password change additionally validates the current password hash and policy.

## Acceptance Criteria

- Password change returns 204 on success, 401 unauthenticated, 403 invalid
  current password, 404 missing user, 422 policy failures.
- Locale update requires If-Match header and returns 412 on ETag mismatch.
- Responses follow RFC7807 for validation and domain errors.
- Audit log records password updates (existing backend infrastructure).
