# Users Domain

## Overview
The Users domain handles user accounts, roles, permissions and profile management. It exposes APIs for creating, updating and querying users and integrates with authentication and authorization layers.

## Entities
- User
- Role
- Permission

## Business Rules
- Users can have multiple roles
- Role-based access controls enforced at UI and API levels

## Use Cases
- Create and update users
- Assign and remove roles
- Query users with filters and pagination

## Dependencies
- Auth (for token management)
- Profile (for user profile details)

## Status
Implemented
