<!--
File: seller-codes.md
Purpose: Domain documentation for Seller Codes. Includes scope, RFs,
model, API refs, permissions, and acceptance criteria.
All Rights Reserved. Arodi Emmanuel
-->

# Seller Codes — Domain

Scope

- Manage seller identification codes and validation rules.

Functional Requirements

- CRUD codes, check validity, assign to orgs.

Data Model

- SellerCode(id, code, status, orgId, createdAt, updatedAt).

API References

- See ../api/openapi-v1.yaml (paths: /seller-codes,\*).

Permissions

- Admin, Manager.

Acceptance Criteria

- Validations enforced and audited.
