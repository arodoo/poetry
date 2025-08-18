<!--
File: billing.md
Purpose: Domain documentation for Billing. Lists scope, RFs, models,
API references, permissions, and acceptance criteria. All Rights
Reserved. Arodi Emmanuel
-->

# Billing — Domain

Scope

- Manage invoices, payment methods, and usage reports.

Functional Requirements

- List invoices, view invoice details, show usage by period.

Data Model

- Invoice(id, orgId?, userId?, amount, status, issuedAt).
- UsageRecord(id, orgId?, userId?, metric, value, period).

API References

- See ../api/openapi-v1.yaml (paths: /billing, /billing/invoices,\*).

Permissions

- Admin; Managers see org-scoped usage as allowed.

Acceptance Criteria

- Reports accurate and exportable. Access control enforced.
