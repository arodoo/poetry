<!--
File: memberships.md
Purpose: Domain documentation for membership sales management.
Describes business rules, validation constraints, relationships
with users, subscriptions, seller codes, and zones.
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Memberships

## Overview

Memberships represent sold subscription plans to users within the system.
Each membership links a user to a subscription plan, validated through
a seller code, and associated with one or more zones. The system supports
creating, updating, retrieving and soft-deleting memberships.

## Aggregate: Membership

Immutable record with the following fields:

- `id`: Unique identifier (Long)
- `userId`: User who purchased membership (Long, required)
- `subscriptionId`: Subscription plan purchased (Long, required)
- `sellerCode`: Valid seller code used (String, required, max 100 chars)
- `zoneIds`: Set of zone IDs or empty for all zones (Set<Long>)
- `allZones`: Flag indicating membership applies to all zones (Boolean)
- `status`: Membership status ("active" or "inactive", default "active")
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `deletedAt`: Soft-delete timestamp (null if active)
- `version`: Optimistic locking version

## Business Rules

1. **Valid User**: User ID must reference an existing active user
2. **Valid Subscription**: Subscription ID must reference existing plan
3. **Valid Seller Code**: Seller code must exist and be active
4. **Zone Selection**: Either zoneIds set OR allZones=true (not both)
5. **Valid Zones**: All zone IDs must reference existing active zones
6. **Soft Delete**: Deleted memberships marked inactive with deletedAt
7. **Optimistic Locking**: Updates require matching version
8. **Seller Code Immutable**: Seller code stored for reference/audit

## Use Cases

- **GetAllMemberships**: Retrieve all active memberships
- **GetMembershipById**: Retrieve single membership by ID
- **CreateMembership**: Create new membership with validations
- **UpdateMembership**: Update membership with ETag validation
- **DeleteMembership**: Soft-delete membership

## Access Control

- List/View: Admin or Manager
- Create/Update/Delete: Admin only

## Related Domains

- Users (via userId reference)
- Subscriptions (via subscriptionId reference)
- Seller Codes (via sellerCode validation)
- Zones (via zoneIds reference or allZones flag)

## Example Membership

- User: John Doe (ID: 5)
- Subscription: Gold Plan (ID: 2)
- Seller Code: SC-2024-001
- Zones: [1, 3, 5] or allZones: true
- Status: active
