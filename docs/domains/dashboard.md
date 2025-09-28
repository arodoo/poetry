<!--
File: dashboard.md
Purpose: Domain documentation for dashboard overview metrics.
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Dashboard

## Scope

Provide authenticated users with real-time visibility into poem production and
community engagement metrics aggregated from backend analytics services.

## Functional Requirements (RFs)

- Retrieve consolidated overview metrics for the current organization.
- Surface highlight messaging indicating the most relevant trend.
- Present counts for total, published, and draft poems plus active members.
- Show the timestamp label delivered by the backend without local mutation.

## Data Model

| Aggregate                      | Fields                                                 |
| ------------------------------ | ------------------------------------------------------ |
| DashboardOverview              | totalPoems, publishedPoems, draftPoems, activeMembers, |
| highlightKey, lastUpdatedLabel |

## API References

- `docs/api/openapi/paths/dashboard-overview.yaml`

## Permissions

- Requires an authenticated user with access to the organization dashboard.
- Highlight messaging respects localization configured per user locale.

## Acceptance Criteria

- Endpoint returns 200 with validated metrics when data exists.
- Empty datasets respond with 204 leading to an empty-state experience.
- Errors propagate RFC7807 payloads and map to localized error messaging.
- Metrics must satisfy published + draft ≤ total to ensure consistency.
