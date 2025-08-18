<!--
File: 21-openapi-v1-completion.md
Purpose: Complete OpenAPI v1 to cover mandatory pages and backend
endpoints. Include headers (ETag, If-Match, Idempotency-Key), RFC7807,
examples, and tags per domain. All Rights Reserved. Arodi Emmanuel
-->

# Task 21 — OpenAPI v1 Completion

Description

- Expand docs/api/openapi-v1.yaml with remaining paths and schemas. Keep v1
  additive. Add examples and error responses.

Expected Result

- Valid OpenAPI. CI validators pass. SDK generation reflects updates.

Prerequisites

- 02 — Backend foundation alignment initial endpoints.

Blocks

- 22 — SDK Generation and Integration.
- 08 — SDK baseline sample usage.

Actual Result

- Modular OpenAPI v1 with $refs, tags, and server.
- Global components: security, headers, responses, and schemas.
- Domains covered: system, auth, users, configuration, organizations.
- Users/organizations support paging; auth/me returns User.
- Errors standardized (401,403,404,409,412,428,429,500) via components.
- Domain docs updated where relevant (configuration links).

Status: Completed Last updated: 2025-08-18 Links

- OpenAPI: ../api/openapi-v1.yaml
- Domains: ../domains
