<!--
File: 12-auth-endpoints.md
Purpose: Status ledger for Auth endpoints. Summarizes implemented capabilities and gaps to guide secure, incremental hardening while preserving DDD layering and additive v1 stability. Captures expected vs actual to evidence completion state and remaining scope for Phase A. All Rights Reserved. Arodi Emmanuel
-->

> ### COMPLETED

# Task 12: Auth Endpoints (/api/v1/auth)

## Task Description

Implement baseline auth (login, register, refresh, logout) with secure token
model, rotation, auditing, error mapping, configuration, and hardening
primitives (rate limiting, lockout, idempotency, key rotation) following DDD +
Clean Architecture.

## Expected Result

Production-ready v1 auth surface: stable endpoints, JWT + refresh rotation,
persistent audit, configurable security properties, idempotent registration,
adaptive protections (rate limit + lockout), secret rotation support, documented
OpenAPI with reusable error responses and operational guidance.

## Actual Result (Current)

All core + advanced protections implemented; OpenAPI & docs enriched; Micrometer
metrics + secret age job live; advanced tests now cover JWT claims, refresh
rotation, idempotent replay, lockout timing, adaptive penalty trigger, and
rotation overlap boundary.

## Completed

- Endpoints: /login /refresh /logout /register
- Ports & use cases (AuthPort + action classes)
- JWT HS256 (iss, sub, exp, jti) + refresh rotation & misuse revocation
- Logout bulk revocation (idempotent)
- BCrypt hashing + password policy adapter
- AuthProperties (TTLs, issuer, secrets, overlap & age validation)
- Signing key rotation (prev/current + overlap & age validation)
- Persistent audit events (correlation id)
- Registration idempotency (persistent replay)
- Email normalization
- Token bucket + adaptive rate limiter (penalty windows) + metrics wrapper
- Account lockout (exponential backoff) + metrics wrapper
- Problem+JSON error mapping (401/409/423/429)
- OpenAPI reusable responses + headers (Correlation-Id, Idempotency-Key)
- Operations + domain docs updated (metrics, rotation procedure)
- Micrometer AuthMetricsPublisher exporting counters
- SecretAgeRotationJob (5m) emits secret age gauges & audit events
- Advanced tests: JWT claims, refresh lifecycle, idempotent replay, lockout
  timing, adaptive penalty, rotation overlap

## Remaining Gaps (Phase A Close-Out)

- Password breach/complexity expansion (future enhancement)
- Distributed (Redis) rate limiter & lockout adapters (scalability)
- Future gauges: active lockouts, active penalties (expose via adapter polling)

## Status

Phase A core hardening: 100% core + advanced test objectives complete. Only
future enhancements (scalability, complexity, gauges) remain for subsequent
tasks.
