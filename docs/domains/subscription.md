# Subscription Domain

## Overview
Manages user subscriptions, plans, and billing cycles for the Poetry platform. Supports plan upgrades, downgrades, and cancellations.

## Entities
- Subscription
- Plan

## Business Rules
- Users can have only one active subscription
- Plan changes take effect at next billing cycle

## Use Cases
- Subscribe to plan
- Change plan
- Cancel subscription

## Dependencies
- Users domain
- Membership domain

## Status
- Implemented
