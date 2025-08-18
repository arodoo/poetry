<!--
File: 21-openapi-v1-completion.md
Purpose: Complete OpenAPI v1 to cover mandatory pages and backend
endpoints. Include headers (ETag, If-Match, Idempotency-Key), RFC7807,
examples, and tags per domain. All Rights Reserved. Arodi Emmanuel
-->
# Task 21 — OpenAPI v1 Completion

Description
- Expand docs/api/openapi-v1.yaml with remaining paths and schemas.
  Keep v1 additive. Add examples and error responses.

Expected Result
- Valid OpenAPI. CI validators pass. SDK generation reflects updates.

Prerequisites
- 02 — Backend foundation alignment initial endpoints.

Blocks
- 22 — SDK Generation and Integration.
- 08 — SDK baseline sample usage.

Actual Result
- Root spec refactored to modular structure with $refs.
- Added components: security, headers, paging, error (RFC7807).
- Added paths: discovery, health, users (CRUD headers, security).
- Added tags scaffold for domains.

Next Steps
- Add auth, organizations, configuration, and account paths.
- Add common error responses using components.schemas.Error.
- Add pagination envelopes and examples on list endpoints.
- Ensure all domain docs reference concrete paths and tags.

Status: In Progress
Last updated: 2025-08-18
Links
- OpenAPI: ../api/openapi-v1.yaml
- Domains: ../domains
