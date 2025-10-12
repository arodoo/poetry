# Public Forgot Password Domain

## Overview
Manages the password reset process for users who have forgotten their credentials. Provides secure flows for requesting and completing password resets.

## Entities
- PasswordResetRequest

## Business Rules
- Only valid users can request password reset
- Reset links expire after a set time

## Use Cases
- Request password reset
- Complete password reset

## Dependencies
- User domain

## Status
- Implemented
