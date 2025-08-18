<!--
File: subscriptions.md
Purpose: Domain documentation for Subscriptions. Includes scope, RFs,
model, API references, permissions, and acceptance criteria.
All Rights Reserved. Arodi Emmanuel
-->

# Subscriptions — Domain

Scope

- Manage customer subscriptions and plans.

Functional Requirements

- Create, update, cancel subscriptions; plan management; usage.

Data Model

- Subscription(id, userId, orgId, plan, status, createdAt, updatedAt).

API References

- See ../api/openapi-v1.yaml (paths: /subscriptions,\*).

Permissions

- Admin, Manager.

Acceptance Criteria

- State transitions validated and reported.
