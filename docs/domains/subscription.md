# Subscription Domain

## Overview
Manages user subscriptions, plans, and billing cycles for the Poetry platform. Supports plan upgrades, downgrades, and cancellations.

## Entities
- Subscription
- Plan

## Business Rules
- Users can have only one active subscription
- Plan changes take effect at next billing cycle
- **A subscription cannot be deleted while it has active memberships assigned.** Attempting to do so throws `SubscriptionHasActiveMembershipsException` (HTTP 409). All memberships must be deleted or deactivated first.

## Use Cases
- Subscribe to plan
- Change plan
- Cancel subscription

## Exceptions
| Exception | HTTP | Trigger |
|---|---|---|
| `SubscriptionNotFoundException` | 404 | ID not found |
| `SubscriptionVersionMismatchException` | 409 | Optimistic lock conflict |
| `SubscriptionHasActiveMembershipsException` | 409 | Delete attempted with active memberships |

## Dependencies
- Users domain
- Membership domain

## Status
- Implemented
