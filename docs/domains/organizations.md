<!--
File: organizations.md
Purpose: Domain documentation for Organizations. Defines scope, RFs,
data model, API references, permissions, and acceptance criteria.
All Rights Reserved. Arodi Emmanuel
-->
# Organizations — Domain

Scope
- Manage organizations, metadata, and membership scope.

Functional Requirements
- CRUD orgs, assign managers, invite members, audit changes.

Data Model
- Organization(id, name, slug, createdAt, updatedAt).
- OrgMember(id, orgId, userId, role, invitedAt, joinedAt).

API References
- See ../api/openapi-v1.yaml (paths: /orgs, /orgs/{orgId}, /members).

Permissions
- Admin (global), Manager (scoped to org).

Acceptance Criteria
- CRUD and member ops validated. Audit log captured and testable.
