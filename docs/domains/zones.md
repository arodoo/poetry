<!--
File: zones.md
Purpose: Domain documentation for Zones. Defines scope, RFs, data
model, API references, permissions, and acceptance criteria.
All Rights Reserved. Arodi Emmanuel
-->

# Zones — Domain

Scope

- Manage content zones for site composition.

Functional Requirements

- CRUD zones, assign content, ordering.

Data Model

- Zone(id, key, title, contentRefs, createdAt, updatedAt).

API References

- See ../api/openapi-v1.yaml (paths: /zones, /zones/{id}).

Permissions

- Admin, Manager.

Acceptance Criteria

- CRUD operations and ordering persisted and tested.
