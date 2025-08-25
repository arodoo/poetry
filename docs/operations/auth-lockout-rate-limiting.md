<!--
File: auth-lockout-rate-limiting.md
Purpose: Operational guide for configuring and monitoring authentication
rate limiting and account lockout mechanisms including environment
variables, adapter parameters, metrics, alerts, and scaling strategy.
All Rights Reserved. Arodi Emmanuel
-->

# Operations: Auth Rate Limiting & Account Lockout

## Overview

Two complementary controls mitigate brute force and credential stuffing:

1. Token Bucket Rate Limiter (per key) + Adaptive Backoff Decorator.
2. Per-User Account Lockout with exponential backoff windows.

Both are in-memory for Phase A; production should externalize to Redis.

## Rate Limiter

Base limiter uses capacity / refillSeconds / tokensPerRefill. Adaptive layer
tracks near-threshold usage; when softBurst reached or base limiter exceeded it
imposes a penalty window doubling up to maxPenaltySeconds.

### Key Dimensions (current)

- register:{username}
- login:{username}
- refresh:{tokenValueHash}

### Configuration (Bean Parameters)

- capacity
- refillSeconds
- tokensPerRefill
- softBurst (adaptive)
- basePenaltySeconds
- maxPenaltySeconds

### Metrics (Implemented)

- auth_rate_acquire_total (counter)
- auth_rate_block_total (counter, includes base + adaptive blocks)
- auth_rate_penalty_windows_active (gauge) FUTURE
- auth_rate_penalty_events_total (counter) FUTURE

## Account Lockout

Tracks consecutive failures per username (optionally IP). After threshold
failures it locks for baseLockSeconds; further failures after unlock increase
window exponentially up to maxLockSeconds.

### Configuration

- threshold
- baseLockSeconds
- maxLockSeconds

### Metrics (Implemented)

- auth_lockout_block_total (counter, lock attempts blocked)
- auth_login_failure_total (counter)
- auth_lockout_active (gauge) FUTURE (would poll adapter)
- auth_lockout_events_total (counter) FUTURE (expose from adapter)

## Secret Age / Rotation Monitoring

- auth_secret_age_seconds (gauge)
- auth_secret_age_pct (gauge)
- auth_secret_rotation_due_total (counter, >=90%)
- auth_secret_overdue_total (counter, >100%)

A scheduled job (every 5m) updates gauges and emits counters + audit events.

## Alerting Recommendations

- Sudden surge in auth_rate_block_total.
- auth_login_failure_total spike across many distinct usernames.
- Persistent penalties (future gauge >0) for >5m indicates abuse.
- auth_secret_rotation_due_total increments without rotation follow-up.
- Any auth_secret_overdue_total increment -> urgent rotation.

## Scaling Strategy

- Replace in-memory adapters with Redis-backed implementations sharing state.
- Preserve port interfaces; only provide new infrastructure beans.
- Add Lua script for atomic token bucket + adaptive logic to minimize chatter.

## Logging / Audit

- login.fail events recorded per attempt; analysis can correlate with limiter
  metrics.
- Secret age nearing max produces audit events: auth.secret.rotation_due /
  overdue.

## Hardening Roadmap

- Add IP dimension.
- Sliding window + token bucket hybrid.
- Distributed lockout with jitter to avoid thundering herd.
- Optional CAPTCHA after repeated lockouts (out-of-scope now).
