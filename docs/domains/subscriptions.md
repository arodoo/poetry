<!--
File: subscriptions.md
Purpose: Domain documentation for subscription plan management CRUD.
Describes business rules, validation constraints and feature structure.
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Subscriptions

## Overview

Subscription plans represent tiered service offerings (e.g., Silver, Gold,
Platinum) with pricing, duration, and feature sets. The system supports
creating, updating, retrieving and soft-deleting subscription plans.

## Aggregate: Subscription

Immutable record with the following fields:

- `id`: Unique identifier (Long)
- `name`: Plan name (e.g., "Gold", "Platinum"). Unique, max 100 chars
- `description`: Plan description (max 500 chars)
- `price`: Decimal price (precision 10, scale 2)
- `currency`: ISO currency code (3 chars, default "USD")
- `durationDays`: Subscription duration in days (Integer)
- `features`: Set of feature identifiers (String Set)
- `status`: Plan status ("active" or "inactive", default "active")
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `deletedAt`: Soft-delete timestamp (null if active)
- `version`: Optimistic locking version

## Business Rules

1. **Unique Name**: Subscription plan names must be unique system-wide
2. **Positive Price**: Price must be greater than zero
3. **Valid Duration**: Duration must be positive (>0 days)
4. **Soft Delete**: Deleted plans are marked inactive with deletedAt timestamp
5. **Optimistic Locking**: Updates require matching version to prevent conflicts

## Use Cases

- **GetAllSubscriptions**: Retrieve all active subscription plans
- **GetSubscriptionById**: Retrieve single plan by ID (404 if not found/deleted)
- **CreateSubscription**: Create new plan (admin only)
- **UpdateSubscription**: Update existing plan with ETag validation (admin only)
- **DeleteSubscription**: Soft-delete plan (admin only)

## Access Control

- List/View: Admin or Manager
- Create/Update/Delete: Admin only

## Example Plans

- **Silver**: Basic tier, 30 days, $9.99/month
- **Gold**: Premium tier, 30 days, $29.99/month
- **Platinum**: Elite tier, 30 days, $49.99/month
