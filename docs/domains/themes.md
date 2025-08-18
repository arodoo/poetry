<!--
File: themes.md
Purpose: Domain documentation for Themes. Describes scope, functional
requirements, data model, API refs, permissions, and acceptance
criteria. All Rights Reserved. Arodi Emmanuel
-->
# Themes — Domain

Scope
- Manage UI themes available to organizations.

Functional Requirements
- CRUD themes, preview, activate per org, version history.

Data Model
- Theme(id, name, variables, version, createdAt, updatedAt).

API References
- See ../api/openapi-v1.yaml (paths: /themes, /themes/{id}).

Permissions
- Admin, Manager within org scope.

Acceptance Criteria
- CRUD operations documented and tested. ETag/Idempotency applied.
