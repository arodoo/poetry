<!--
File: zones.md
Purpose: Domain documentation for Zones. Defines scope, RFs, data
model, API references, permissions, and acceptance criteria.
All Rights Reserved. Arodi Emmanuel
-->

# Zones — Domain

## Scope

Manage organizational zones representing distinct operational areas
(stores, warehouses, regions) with assigned manager oversight and
basic metadata tracking.

## Functional Requirements

- CRUD zones with unique names and descriptions
- Assign manager (User) to each zone for operational control
- Support pagination and search for efficient zone browsing
- Soft delete with optimistic locking for concurrency safety
- Track creation and update timestamps for audit trails

## Data Model

- **Zone**: Aggregate root representing an operational zone
  - `id`: Unique identifier (Long)
  - `name`: Zone name (String, max 100 chars)
  - `description`: Zone description (String, max 500 chars)
  - `managerId`: Reference to managing User (Long, FK to users table)
  - `createdAt`, `updatedAt`, `deletedAt`: Audit timestamps
  - `version`: Optimistic locking version

## Use Cases

- **GetAllZones**: Retrieve list of all active zones
- **GetZonesPage**: Retrieve paginated zones with search support
- **GetZoneById**: Retrieve single zone by ID
- **CreateZone**: Create new zone with manager assignment
- **UpdateZone**: Update existing zone with version check
- **DeleteZone**: Soft delete zone

## API Endpoints

- `GET /api/v1/zones` - List all zones
- `GET /api/v1/zones/paged` - List zones with pagination and search
- `GET /api/v1/zones/{id}` - Get zone by ID
- `POST /api/v1/zones` - Create new zone
- `PUT /api/v1/zones/{id}` - Update zone
- `DELETE /api/v1/zones/{id}` - Delete zone (soft delete)

## Permissions

- List/View: Requires 'admin' or 'manager' role
- Create/Update/Delete: Requires 'admin' role only

## Business Rules

1. Each zone must have a valid manager assigned (FK to users table)
2. Zone names should be descriptive and unique within organization
3. Zones support soft deletion (no hard deletes)
4. Manager assignment must reference active user in the system

## Acceptance Criteria

- All endpoints return RFC 7807 Problem Details on errors
- Soft deleted zones excluded from list and get operations
- Version mismatch returns 412 Precondition Failed
- Manager ID must exist in users table (FK constraint enforced)
- Pagination supports page size 1-100 with search across name/description
- All operations tested with positive and negative paths

## Related Domains

- Users (via managerId reference for zone manager)
- Organizations (future: zones scoped to organizations)

