<!--
File: auth-v1.md
Purpose: Auth API v1 documentation summarizing endpoints, token
contract (JWT access + opaque refresh + expiry), rotation and error
mapping. Aligns with OpenAPI spec and implementation; additive only.
All Rights Reserved. Arodi Emmanuel
-->

# Auth API v1

Base path: /api/v1/auth

## Endpoints

- POST /login: { username, password } -> { accessToken, refreshToken, expiresIn,
  username }
- POST /refresh: { refreshToken } -> rotated tokens { accessToken, refreshToken,
  expiresIn }
- POST /logout: { refreshToken } -> 204 (revokes all active tokens)
- POST /register: { user } -> user summary + tokens (id, username, email,
  tokens)

## Tokens Schema

accessToken: JWT (HS256) with claims: sub=username, iss=issuer, iat, exp, jti.
refreshToken: opaque UUID persisted (single-use chain). expiresIn: integer
seconds (access token TTL). username: present on login.

## Rotation Rules

Every refresh invalidates prior refresh token (status ROTATED) and issues new
ACTIVE. Reuse or expired token triggers bulk revoke and 401.

## Error Mapping (Problem+JSON)

401 InvalidCredentials -> code auth.invalid_credentials 401 InvalidRefreshToken
-> code auth.invalid_refresh_token 409 DuplicateUser -> code auth.duplicate_user
Validation errors -> 400 with errors object.

## Idempotency & Headers

Idempotency-Key supported on register (same response on retry). Future
Correlation-Id to correlate traces.

## Notes

All changes additive. Future RBAC, account lockout, device metadata will extend
schema via new fields only.
