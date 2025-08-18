# Domain: User

- Scope: manage user profiles with soft delete.
- Requirements: CRUD, soft-delete, ETag/If-Match, Idempotency-Key.
- Data model: id, firstName, lastName, email, username, active, roles.
- API: see docs/api/users-v1.md
- Concurrency:
  - ETag: strong, based on canonical JSON of response.
  - If-Match: required for PUT/DELETE; 428 if missing, 412 if mismatch.
  - Idempotency-Key: persisted; duplicate keys -> 409.
- Permissions: to be defined in v1 (open), v2 will restrict.
- Acceptance:
  - Repeating POST/PUT/DELETE with same Idempotency-Key is conflict.
  - Updating/deleting without valid If-Match is rejected.
