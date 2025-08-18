<!--
File: users-v1.md
Purpose: Users API documentation for v1 with ETag/If-Match and Idempotency-Key notes.
All Rights Reserved. Arodi Emmanuel
-->

# Users API v1

- Base path: /api/v1/users
- Endpoints:
  - GET /: list users (ETag on response)
  - GET /{id}: get by id (ETag on response)
  - POST /: create user (accepts Idempotency-Key; duplicates -> 409)
  - PUT /{id}: update user (requires If-Match of current ETag)
  - DELETE /{id}: soft-delete user (requires If-Match of current ETag)

Headers

- ETag: Strong hash of response body added by server.
- If-Match: Must equal current ETag for PUT/DELETE; otherwise 428/412.
- Idempotency-Key: Optional for POST/PUT/DELETE; if reused -> 409.
