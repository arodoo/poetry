/*
 * File: LoginAction.java
 * Purpose: Orchestrates login flow: applies rate limiting, checks
 * adaptive account lockout, validates credentials, issues tokens and
 * records audit events. Kept minimal to satisfy line constraints and
 * isolate logic for testability. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.action.login;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.exception.InvalidCredentialsException;
import com.poetry.poetry_backend.application.auth.port.security.AccountLockoutPort;
import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.application.auth.port.security.RateLimiterPort;
import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.RefreshTokenManager;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.TokenResponseFactory;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

public class LoginAction {
  private final UserJpaRepository users;
  private final PasswordHasherPort hasher;
  private final TokenGeneratorPort tokens;
  private final RefreshTokenManager manager;
  private final AuditLoggerPort audit;
  private final RateLimiterPort limiter;
  private final TokenResponseFactory factory;
  private final AccountLockoutPort lockout;

  public LoginAction(
      UserJpaRepository users,
      PasswordHasherPort hasher,
      TokenGeneratorPort tokens,
      RefreshTokenManager manager,
      AuditLoggerPort audit,
      RateLimiterPort limiter,
      TokenResponseFactory factory,
      AccountLockoutPort lockout) {
    this.users = users;
    this.hasher = hasher;
    this.tokens = tokens;
    this.manager = manager;
    this.audit = audit;
    this.limiter = limiter;
    this.factory = factory;
    this.lockout = lockout;
  }

  public Map<String, Object> execute(String username, String password) {
    limiter.acquire("login:" + username);
    lockout.ensureNotLocked(username, null);
    UserEntity user = users.findActiveByUsername(username).orElseThrow(() -> fail(username));
    if (!hasher.matches(password, user.getPasswordHash())) {
      lockout.onFailure(username, null);
      throw fail(username);
    }
    lockout.onSuccess(username, null);
    java.util.List<String> rolesList = user.getRoles() == null
        ? java.util.List.of()
        : new java.util.ArrayList<>(user.getRoles());
    String access = tokens.newAccessToken(username, rolesList);
    String refresh = manager.issue(user.getId(), null);
    audit.record("login.success", username, "issued");
    return factory.tokens(username, access, refresh);
  }

  private InvalidCredentialsException fail(String u) {
    audit.record("login.fail", u, "invalid_credentials");
    return new InvalidCredentialsException("invalid");
  }
}
