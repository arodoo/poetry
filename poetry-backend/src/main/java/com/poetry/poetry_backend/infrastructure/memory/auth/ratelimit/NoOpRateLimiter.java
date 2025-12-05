/*
 * File: NoOpRateLimiter.java
 * Purpose: Development rate limiter performing no real limiting while
 * satisfying RateLimiterPort contract. Allows later replacement with
 * production implementations (Redis, token bucket) transparently.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.auth.ratelimit;

import com.poetry.poetry_backend.application.auth.port.security.RateLimiterPort;

public class NoOpRateLimiter implements RateLimiterPort {
  public void acquire(String key) {
    /* no-op */ }
}
