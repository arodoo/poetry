/*
 * File: RefreshAction.java
 * Purpose: Performs refresh token rotation using RefreshTokenManager and
 * constructs new access/refresh tokens. Enforces rate limiting and maps
 * repository results to token responses for the controller. This class
 * encapsulates the refresh use-case orchestration and error translation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.action.login;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.security.RateLimiterPort;
import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.RefreshTokenManager;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.TokenResponseFactory;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

public class RefreshAction {
  private final RefreshTokenManager manager;
  private final TokenGeneratorPort tokens;
  private final UserJpaRepository users;
  private final TokenResponseFactory factory;
  private final RateLimiterPort limiter;

  public RefreshAction(
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

  public Map<String, Object> execute(String refreshToken) {
    limiter.acquire("refresh:" + refreshToken);
    var rotated = manager.rotate(refreshToken);
    var user = users.findById(rotated.userId()).orElse(null);
    if (user == null) {
      throw new com.poetry.poetry_backend.application.auth.exception.InvalidRefreshTokenException("user_not_found");
    }
    String username = user.getUsername();
    java.util.List<String> rolesList = user.getRoles() == null
        ? java.util.List.of()
        : new java.util.ArrayList<>(user.getRoles());
    String access = tokens.newAccessToken(username, rolesList);
    return factory.tokens(username, access, rotated.newToken());
  }
}
