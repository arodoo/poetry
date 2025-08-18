<!--
File: memberships.md
Purpose: Domain documentation for Memberships. Contains scope, RFs,
model, API refs, permissions, and acceptance criteria.
All Rights Reserved. Arodi Emmanuel
-->

# Memberships — Domain

Scope

- Manage organization memberships and roles.

Functional Requirements

- CRUD memberships, role changes, invitations.

Data Model

- Membership(id, orgId, userId, role, createdAt, updatedAt).

API References

- See ../api/openapi-v1.yaml (paths: /memberships,\*).

Permissions

- Admin, Manager.

Acceptance Criteria

- Role rules enforced and audited.
