/*
 * File: RateLimiterPort.java
 * Purpose: Contract for enforcing rate limits on sensitive authentication
 * operations (login, register). Allows introduction of distributed
 * limiters later without changing application logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.port.security;

public interface RateLimiterPort {
  /** Acquire permission for a key or throw RateLimitExceededException. */
  void acquire(String key);
}
