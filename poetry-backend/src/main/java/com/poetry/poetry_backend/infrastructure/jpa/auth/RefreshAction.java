/*
 * File: RefreshAction.java
 * Purpose: Performs refresh token rotation using RefreshTokenManager and
 * constructs new access/refresh tokens. Enforces rate limiting and maps
 * repository results to token responses for the controller. This class
 * encapsulates the refresh use-case orchestration and error translation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.RateLimiterPort;
import com.poetry.poetry_backend.application.auth.port.TokenGeneratorPort;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

class RefreshAction {
  private final RefreshTokenManager manager;
  private final TokenGeneratorPort tokens;
  private final UserJpaRepository users;
  private final TokenResponseFactory factory;
  private final RateLimiterPort limiter;

  RefreshAction(
      RefreshTokenManager manager,
      TokenGeneratorPort tokens,
      UserJpaRepository users,
      TokenResponseFactory factory,
      RateLimiterPort limiter) {
    this.manager = manager;
    this.tokens = tokens;
    this.users = users;
    this.factory = factory;
    this.limiter = limiter;
  }

  Map<String, Object> execute(String refreshToken) {
    limiter.acquire("refresh:" + refreshToken);
    var rotated = manager.rotate(refreshToken);
    String username = users
        .findById(rotated.userId())
        .map(u -> u.getUsername())
        .orElse(null);
    String access = tokens.newAccessToken(username);
    return factory.tokens(username, access, rotated.newToken());
  }
}
