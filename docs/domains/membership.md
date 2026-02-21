# Membership Domain

## Overview
Manages user memberships, including creation, updates, and role assignments. Supports different membership types and permissions for the Poetry platform.

## Entities
- Membership
- MembershipType

## Business Rules
- Only admins can assign or revoke memberships
- **Deleting or setting a membership to `inactive` automatically cancels the user's active `UserHasMembership` record** (sets `status = "cancelled"`), freeing the user to receive a new membership immediately. No guard blocks re-assignment after cancellation.

## `user_has_membership` status lifecycle

| Status | Meaning |
|---|---|
| `active` | Current billing period in progress |
| `completed` | Ended naturally via renewal |
| `expired` | `endDate` passed without renewal |
| `cancelled` | Interrupted early — parent membership deleted or set inactive |

## Use Cases
- Create membership
- Edit membership (cascade to `user_has_membership` if status → `inactive`)
- Delete membership (soft-delete + cascade cancel `user_has_membership`)
- Assign / Renew billing period

## Dependencies
- Users domain
- Subscription domain

## Status
- Implemented
