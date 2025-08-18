<!--
File: platform-health-jobs.md
Purpose: Domain documentation for Platform Health and Jobs.
Covers scope, RFs, model, API references, permissions, and acceptance
criteria. All Rights Reserved. Arodi Emmanuel
-->
# Platform Health & Jobs — Domain

Scope
- Monitor platform health and background jobs.

Functional Requirements
- View health, list running/completed jobs, inspect failures.

Data Model
- Job(id, name, status, startedAt, endedAt, error?).

API References
- See ../api/openapi-v1.yaml (paths: /admin/health, /admin/jobs).

Permissions
- Admin only.

Acceptance Criteria
- Actuator and job data surfaced securely. Tests verify access.
