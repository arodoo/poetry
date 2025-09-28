<!--
File: public-forgot-password.md
Purpose: Domain documentation for public forgot-password flow.
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Public Forgot Password

## Scope

Allow unauthenticated users to request a password reset via email with localized
messaging and idempotent handling.

## Functional Requirements (RFs)

- Accept email address and enqueue reset email when account exists.
- Return localized success message key regardless of account exposure.
- Throttle requests via Idempotency-Key headers.

## Data Model

| Aggregate                   | Fields     |
| --------------------------- | ---------- |
| PublicForgotPasswordRequest | email      |
| PublicForgotPasswordResult  | messageKey |

## API References

- `docs/api/openapi/paths/public-forgot-password-request.yaml`

## Permissions

- Endpoint is public but rate-limited; no authentication required.

## Acceptance Criteria

- Valid email triggers 202/200 with success message key matching i18n catalog.
- Invalid email yields validation error referencing localized key.
- Repeated requests with same key remain idempotent and safe.
