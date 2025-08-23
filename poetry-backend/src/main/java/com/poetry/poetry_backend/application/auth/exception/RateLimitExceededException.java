/*
 * File: RateLimitExceededException.java
 * Purpose: Signals that a rate limiting rule has been exceeded for a
 * protected authentication action (login, register, refresh, logout).
 * Thrown by RateLimiterPort implementations enabling controller and
 * global handlers to translate into a 429 RFC7807 response without
 * leaking internal limiter data. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.exception;

public class RateLimitExceededException extends RuntimeException {
  public RateLimitExceededException(String message) { super(message); }
}
