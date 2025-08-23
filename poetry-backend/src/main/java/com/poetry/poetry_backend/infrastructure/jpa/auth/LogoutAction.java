/*
 * File: LogoutAction.java
 * Purpose: Revokes all active refresh tokens for user via provided
 * refresh token value. Idempotent. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import com.poetry.poetry_backend.application.auth.port.RateLimiterPort;

class LogoutAction {
  private final RefreshTokenManager manager;
  private final RateLimiterPort limiter;

  LogoutAction(RefreshTokenManager manager, RateLimiterPort limiter) {
    this.manager = manager;
    this.limiter = limiter;
  }

  void execute(String refreshToken) {
    limiter.acquire("logout:" + refreshToken);
    manager.logout(refreshToken);
  }
}
