<!--
File: configuration.md
Purpose: Domain documentation for Global Configuration. Summarizes scope,
RFs, data model, API references, permissions, and acceptance criteria.
All Rights Reserved. Arodi Emmanuel
-->
# Global Configuration — Domain

Scope
- Manage platform-wide configuration (CORS, features, limits).

Functional Requirements
- Read/update config, validate types, and version changes.

Data Model
- ConfigEntry(key, value, type, version, updatedAt, updatedBy).

API References
- See ../api/openapi-v1.yaml (configuration tag).
- Paths: /api/v1/configuration and /api/v1/configuration/{key}.

Permissions
- Admin only.

Acceptance Criteria
- Typed validation enforced. ETag and audit present. Tests pass.
