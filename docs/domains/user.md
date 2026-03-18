# User Domain

## Overview

Manages user accounts, profiles, and authentication credentials for the Poetry
platform. Supports user registration, updates, role assignments, and admin
password reset.

## Entities

- User
- Profile

## Business Rules

- Usernames must be unique
- Email verification required for registration
- Password minimum 10 characters (validated via PasswordPolicyPort)
- Admin can reset user passwords

## Use Cases

- Register user
- Update profile
- Assign roles
- Admin password reset (NEW)

## API Endpoints

| Method | Path                        | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | /api/v1/users/{id}          | Get user by ID       |
| PUT    | /api/v1/users/{id}          | Update user          |
| PUT    | /api/v1/users/{id}/password | Admin password reset |
| DELETE | /api/v1/users/{id}          | Soft delete user     |

## Dependencies

- Auth domain
- Membership domain

## Status

- Implemented
