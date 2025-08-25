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
  tokens) — idempotent when Idempotency-Key provided (same response body on safe
  retry).

## Tokens Schema

accessToken: JWT (HS256) with claims: sub=username, iss=issuer, iat, exp, jti.
refreshToken: opaque UUID persisted (single-use chain). expiresIn: integer
seconds (access token TTL). username: present on login.

## Rotation Rules

Every refresh invalidates prior refresh token (status ROTATED) and issues new
ACTIVE. Reuse or expired token triggers bulk revoke and 401. Signing key
rotation supported through current secretKey and previousSecretKey with
rotationOverlapSeconds grace ( only verification in infra layer, no API change).

## Error Mapping (Problem+JSON)

401 InvalidCredentials -> code auth.invalid_credentials 401 InvalidRefreshToken
-> code auth.invalid_refresh_token 409 DuplicateUser -> code auth.duplicate_user
423 AccountLocked -> code auth.account_locked 429 RateLimitExceeded ->
rate_limit.exceeded Validation errors -> 400 with errors object.

OpenAPI includes explicit examples for common error types (invalid credentials,
rate limit, lockout, password policy violation) under reusable response
components.

## Idempotency & Headers

Idempotency-Key supported on register (same 200 response on replay).
Correlation-Id header accepted on auth endpoints and echoed for trace
correlation.

## Registration Implementation (Internal)

Internally registration orchestration was refactored into focused helpers:
RegisterAction (orchestrator), RegisterActionSupport (validation/hash),
RegisterIdempotencySupport (lookup/store + replay audit),
RegisterUniquenessSupport (duplicate detection), RegisterPersistenceSupport
(user entity + hashing), RegisterTokenIssuanceSupport (token + response
assembly). Behavior unchanged; audit events extended with
register.idempotent_replay and register.fail.

## Lockout & Adaptive Rate Limiting

Login guarded by token bucket + adaptive penalty and per-user lockout with
exponential backoff (base 60s doubling to max 1800s). Lockout resets on
successful login; failures during lock window do not extend window (future
improvement may apply sliding window).

## Secret Policy

Secrets validated (>=32 length, >=3 char classes). Previous secret must differ
from current; overlap only allowed when previousSecretKey defined.

## Operations References

See operations docs: `auth-lockout-rate-limiting.md` and domain auth doc for
configuration, metrics and rotation procedure.

## Notes

All changes additive. Future RBAC, account lockout MFA, device metadata will
extend schema via new fields only.
