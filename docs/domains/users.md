<!--
File: users.md
Purpose: Domain documentation for administrative user management CRUD.
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Users

## Scope

Provide administrators the ability to list, create, edit, secure, enable, and
disable platform user accounts while preserving concurrency guarantees and
auditing requirements.

## Functional Requirements (RFs)

- List users with pagination-ready metadata and status indicators.
- Retrieve a single user detail including locale, roles, and version token.
- Create new administrative accounts with generated credentials and roles.
- Update profile fields, assigned roles, and security credentials independently.
- Disable or enable accounts through versioned status toggles.
- Surface validation and conflict errors via localized problem details.

## Data Model

- **User**: id, username, email, locale, roles, status, version, createdAt,
  updatedAt.
- **UserRoles**: userId, roles, version.
- **UserSecurity**: userId, password, mfaState, version.

## API References

- `docs/api/openapi/paths/users.yaml`
- `docs/api/openapi/paths/users-collection.yaml`
- `docs/api/openapi/paths/users-item.yaml`

## Permissions

- Endpoints restricted to authenticated administrators with user-management
  scope.
- Role modifications require elevated `users:roles` capability.
- Security updates require `users:security` capability and mandatory auditing.

## Acceptance Criteria

- Create requests include an Idempotency-Key header; duplicates return 409.
- Update and status toggles require If-Match and return 412 on version mismatch.
- All responses adopt RFC7807 payloads with localized `errorCode` values.
- Disabled users cannot authenticate until re-enabled and password reset.
