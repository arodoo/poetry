<!--
File: api-webhooks.md
Purpose: Domain documentation for API keys and Webhooks.
Includes scope, RFs, model, API references, permissions, and
acceptance criteria. All Rights Reserved. Arodi Emmanuel
-->
# API Keys & Webhooks — Domain

Scope
- Manage programmatic access and outbound webhook deliveries.

Functional Requirements
- CRUD API keys, rotate secrets, list deliveries, retry webhooks.

Data Model
- ApiKey(id, name, tokenHash, createdAt, lastUsedAt, scopes).
- Webhook(id, targetUrl, event, secret, status, lastDeliveryAt).

API References
- See ../api/openapi-v1.yaml (paths: /admin/api-keys, /admin/webhooks).

Permissions
- Admin only.

Acceptance Criteria
- Secret handling correct. Delivery logs retriable and auditable.
