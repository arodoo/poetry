<!--
File: public-login.md
Purpose: Domain documentation for public login.
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Public Login

## Scope

Authenticate visitors with username and password, issuing tokens and routing
into the authenticated workspace.

## Functional Requirements (RFs)

- Validate username and password client-side before submission.
- Submit credentials with idempotency headers to mitigate replay.
- Persist access and refresh tokens on success for subsequent requests.

## Data Model

| Aggregate          | Fields                    |
| ------------------ | ------------------------- |
| PublicLoginRequest | username, password        |
| PublicLoginResult  | accessToken, refreshToken |

## API References

- `docs/api/openapi/paths/public-login-request.yaml`

## Permissions

- Endpoint is public but subject to rate limiting and brute-force controls.

## Acceptance Criteria

- Invalid credentials surface localized error without exposing account data.
- Successful authentication stores tokens and navigates to dashboard route.
- Network failures show retry guidance using localized messaging.
