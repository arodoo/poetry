/*
 * File: NoOpAccountLockout.java
 * Purpose: Development account lockout performing no real locking while
 * satisfying AccountLockoutPort contract. Allows E2E tests to run without
 * triggering lockouts after multiple failed login attempts.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.auth;

import com.poetry.poetry_backend.application.auth.port.AccountLockoutPort;

public class NoOpAccountLockout implements AccountLockoutPort {
  @Override
  public void ensureNotLocked(String username, String clientIp) { /* no-op */ }

  @Override
  public void onFailure(String username, String clientIp) { /* no-op */ }

  @Override
  public void onSuccess(String username, String clientIp) { /* no-op */ }
}
