/*
 * File: AccountLockoutPort.java
 * Purpose: Contract for adaptive account lockout: consult lock state
 * before authentication, record failures with escalating lock duration
 * and reset state upon successful login. Abstracts persistence so
 * strategies (JPA, distributed cache) can be swapped. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.port.security;

public interface AccountLockoutPort {
  /** Throw AccountLockedException if locked; no-op otherwise. */
  void ensureNotLocked(String username, String clientIp);
  /** Record a failed attempt and possibly lock account. */
  void onFailure(String username, String clientIp);
  /** Reset counters on success (optional partial decay). */
  void onSuccess(String username, String clientIp);
}
