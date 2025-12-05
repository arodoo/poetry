/*
 * File: LogoutAction.java
 * Purpose: Revokes all active refresh tokens for user via provided
 * refresh token value. Idempotent. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.action;

import com.poetry.poetry_backend.application.auth.port.RateLimiterPort;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.RefreshTokenManager;

public class LogoutAction {
  private final RefreshTokenManager manager;
  private final RateLimiterPort limiter;

  public LogoutAction(RefreshTokenManager manager, RateLimiterPort limiter) {
    this.manager = manager;
    this.limiter = limiter;
  }

  public void execute(String refreshToken) {
    limiter.acquire("logout:" + refreshToken);
    manager.logout(refreshToken);
  }
}
