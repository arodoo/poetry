<!--
File: auth.md
Purpose: Domain documentation for Authentication covering scope,
functional requirements, ports, use cases, data model, API references,
permissions, acceptance criteria, and adapter notes for v1 & production
hardening (JWT, rotation, hashing). All Rights Reserved. Arodi Emmanuel
-->

# Domain: Auth

## Scope

Provide secure authentication: register, login, refresh (single-use rotation),
logout (full revocation) producing JWT access tokens and opaque refresh tokens
persisted with rotation chain.

## Functional Requirements (RFs)

- Register creates active user (unique username) and returns tokens.
- Login validates credentials (BCrypt) and returns tokens.
- Refresh rotates single-use refresh token; misuse revokes chain.
- Logout revokes all active refresh tokens of user.

## Ports

- AuthPort: login, refresh, logout, register.
- PasswordHasherPort, TokenGeneratorPort, ClockPort, AuditLoggerPort,
  RateLimiterPort, AccountLockoutPort, IdempotencyPort, PasswordPolicyPort,
  EmailNormalizerPort.

## Use Cases

LoginUseCase, RefreshTokenUseCase, LogoutUseCase, RegisterUseCase.

## Data Model

UserEntity(id, username, email, passwordHash, roles, active).
RefreshTokenEntity(id, userId, tokenValue, parentTokenValue, issuedAt,
expiresAt, status[ACTIVE|ROTATED|REVOKED], rotatedAt, revokedAt, revokeReason).

## Token Lifecycle (Rotation)

1 issue ACTIVE (parent=null). 2 client calls refresh: mark old ROTATED, create
new ACTIVE(parent=old). 3 reuse/expired/mismatched -> revoke all ACTIVE (status
REVOKED reason misuse). 4 logout -> revoke all ACTIVE reason logout.

## API References

See docs/api/auth-v1.md and OpenAPI path specs (auth-login, refresh, logout,
register).

## Permissions

Roles stored (future RBAC). Current endpoints open (register/login) or require
valid refresh for logout.

## Acceptance Criteria

- Single-use refresh enforced; misuse chain revoked.
- JWT access tokens signed HS256 with issuer and exp.
- Errors map to Problem+JSON with auth codes.
- Account lockout triggers 423 with consistent problem body.
- Rate limit triggers 429 with problem body.
- Secret rotation overlap supported with previousSecretKey + overlap window.
- Secret policy validated (length, entropy classes, non-equality to previous).

## Adapters

JpaAuthAdapter + RefreshTokenManager (production), InMemoryAuthAdapter
(tests/dev fallback). InMemoryTokenBucketRateLimiter +
AdaptiveRateLimiterAdapter provide layered rate limiting;
InMemoryAccountLockoutAdapter supplies per-user lock window.
JwtTokenGeneratorAdapter supports key rotation via properties.

### Registration Implementation Structure (Refactored)

Registration orchestration (previously a monolithic RegisterAction) is split
into cohesive supports to align with DDD, SOLID and file size limits:

- RegisterAction: thin orchestrator; sequences validation, rate limiting,
  idempotent replay, uniqueness, persistence, token issuance.
- RegisterActionSupport: lightweight input validation + simple hash used for
  idempotency replay key (non-cryptographic, stability only).
- RegisterIdempotencySupport: interacts with IdempotencyPort to lookup/store
  prior successful responses; records replay audit event.
- RegisterUniquenessSupport: enforces username/email uniqueness and emits
  failure audit on duplicates.
- RegisterPersistenceSupport: constructs and saves UserEntity applying password
  hashing via PasswordHasherPort.
- RegisterTokenIssuanceSupport: issues access + refresh tokens, persists refresh
  chain root, builds API response via TokenResponseFactory.

Benefits: smaller focused classes, clearer test targets, reduced cognitive load,
preserved behavior and audit trail parity.

## Security Considerations

Strong secret (>=32 chars). BCrypt strength configurable (4-16). TTLs bounded.
No plaintext passwords stored. Lockout prevents brute force burst attempts.
Rotation overlap should be minimal; previous key removed after expiry window.

### Lockout Policy

- Threshold failures: configurable (current in-memory adapter constructor).
- Backoff: exponential (base 60s doubling until max 1800s example).
- Reset: on successful login; failures during lock interval ignored.
- Future: distribute via Redis for horizontal scalability.

### Adaptive Rate Limiting

- Base limiter: token bucket (capacity/refill).
- Adaptive decorator: tracks near-threshold usage; imposes penalty windows.
- Failure: 429 with `rate_limit.exceeded` code.
- Future: integrate sliding window + per-IP dimension.

### Password Policy

- Port abstraction; current adapter enforces minimal complexity.
- Violations -> 400 `auth.password_policy`.
- Future: HaveIBeenPwned or offline breach list integration.

### Email Normalization

- Lowercase + trim to prevent duplicate accounts via case variants.

### Key Rotation

- Properties: `auth.secretKey`, `auth.previousSecretKey`,
  `auth.rotationOverlapSeconds`, `auth.maxSecretAgeSeconds`,
  `auth.secretIssuedAt` (metadata ISO-8601).
- Overlap: previous secret accepted for verification within overlap window.
- Enforcement: startup validation rejects weak or invalid configuration.
- Scheduled job (SecretAgeRotationJob) emits metrics + audit when age >=90%
  and >100% of max.

## Operations

### Environment Variables (auth subset)

- `AUTH_SECRET_KEY` -> auth.secretKey (>=32 chars, ≥3 classes)
- `AUTH_PREVIOUS_SECRET_KEY` -> auth.previousSecretKey (optional)
- `AUTH_ROTATION_OVERLAP_SECONDS` -> auth.rotationOverlapSeconds (<=86400)
- `AUTH_MAX_SECRET_AGE_SECONDS` -> auth.maxSecretAgeSeconds (<=7776000)
- `AUTH_SECRET_ISSUED_AT` -> auth.secretIssuedAt (ISO-8601 string)
- `AUTH_ACCESS_TOKEN_TTL_SECONDS` -> auth.accessTokenTtlSeconds (<=86400)
- `AUTH_REFRESH_TOKEN_TTL_SECONDS` -> auth.refreshTokenTtlSeconds (<=2592000)
- `AUTH_BCRYPT_STRENGTH` -> auth.bcryptStrength (4-16)

Validation occurs at startup; application will not start on violation.

### Rate Limiter Configuration

Current in-memory adapter parameters wired in bean configuration (capacity,
refill interval, tokens per refill, adaptive soft burst, penalty bounds). For
production deploy a Redis-based adapter; metrics emitted via
AuthMetricsPublisher:

- auth_rate_acquire_total
- auth_rate_block_total

### Lockout Configuration

In-memory adapter parameters: threshold failures, base lock seconds, max lock
seconds. Metrics:

- auth_lockout_block_total
- auth_login_failure_total

### Metrics & Monitoring

Micrometer counters and gauges via wrapper + scheduled job:

- auth*rate*\* counters (see above)
- auth*lockout*\* counters (see above)
- auth_secret_age_seconds / pct gauges
- auth_secret_rotation_due_total / overdue_total

Alerting suggestions:

- High lockout rate spike -> potential credential stuffing.
- Sustained adaptive penalties -> tune capacity or investigate abuse.
- Secret age > 90% of max -> rotate.

### Secret Rotation Procedure

1 Generate new strong secret; set as `AUTH_SECRET_KEY`, move previous to
`AUTH_PREVIOUS_SECRET_KEY`. 2 Set `AUTH_ROTATION_OVERLAP_SECONDS` to overlap
window (e.g., 3600). 3 Deploy; monitor that tokens with old secret still
accepted. 4 After overlap window + max access token TTL, remove previous secret
and set overlap to 0; update `AUTH_SECRET_ISSUED_AT`. 5 Schedule rotation before
`AUTH_MAX_SECRET_AGE_SECONDS` breach (job warns).

## Audit Events (examples)

login.success, login.fail, register, register.fail, register.idempotent_replay,
refresh.issue, refresh.rotate, refresh.misuse, refresh.logout,
auth.secret.rotation_due, auth.secret.overdue.

## Headers

Correlation-Id accepted and echoed for tracing. Idempotency-Key on register.
