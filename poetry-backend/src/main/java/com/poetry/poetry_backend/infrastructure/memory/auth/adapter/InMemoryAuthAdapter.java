/*
 * File: InMemoryAuthAdapter.java
 * Purpose: In-memory implementation of authentication adapter used for
 * testing and local development. Provides simple auth operations without
 * external dependencies for fast iterations and CI tests. Returns
 * accessToken, refreshToken, expiresIn (OpenAPI) plus username when present.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth.adapter;

import java.util.*;

import com.poetry.poetry_backend.application.auth.exception.*;
import com.poetry.poetry_backend.application.auth.port.AuthPort;
import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.application.auth.port.security.RateLimiterPort;
import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.support.ClockPort;
import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.config.auth.AuthProperties;

public class InMemoryAuthAdapter implements AuthPort {
  private final TokenGeneratorPort tokens;
  private final AuditLoggerPort audit;
  private final RateLimiterPort rateLimiter;
  private final InMemoryTokenResponseBuilder responseBuilder;
  private final InMemoryUserStore userStore;
  private final InMemoryRegistrationHandler registrationHandler;
  private final Set<String> refreshTokens = Collections.synchronizedSet(new HashSet<>());

  public InMemoryAuthAdapter(
      PasswordHasherPort hasher,
      TokenGeneratorPort tokens,
      ClockPort clock,
      AuditLoggerPort audit,
      RateLimiterPort rateLimiter,
      AuthProperties props) {
    this.tokens = tokens;
    this.audit = audit;
    this.rateLimiter = rateLimiter;
    this.responseBuilder = new InMemoryTokenResponseBuilder(clock, props);
    this.userStore = new InMemoryUserStore(hasher, audit);
    var idempotencyStore = new InMemoryIdempotencyStore();
    this.registrationHandler = new InMemoryRegistrationHandler(userStore, idempotencyStore);
  }

  public Map<String, Object> login(String u, String p) {
    rateLimiter.acquire("login:" + u);
    if (!userStore.validateCredentials(u, p)) {
      audit.record("login.fail", u, "invalid_credentials");
      throw new InvalidCredentialsException("auth.login.invalid");
    }
    var at = tokens.newAccessToken(u, java.util.List.of());
    var rt = tokens.newRefreshToken(u);
    refreshTokens.add(rt);
    var response = responseBuilder.build(u, at, rt);
    audit.record("login.success", u, "issued_tokens");
    return response;
  }

  public Map<String, Object> refresh(String t) {
    if (!refreshTokens.contains(t)) {
      audit.record("refresh.fail", "?", "invalid_refresh");
      throw new InvalidRefreshTokenException("auth.refresh.invalid");
    }
    var at = tokens.newAccessToken("subject", java.util.List.of());
    var response = responseBuilder.build(null, at, t);
    audit.record("refresh.success", "?", "refreshed");
    return response;
  }

  public void logout(String t) {
    refreshTokens.remove(t);
    audit.record("logout", "?", "revoked");
  }

  public Map<String, Object> register(Map<String, Object> user) {
    return register(user, null);
  }

  public Map<String, Object> register(Map<String, Object> user, String key) {
    return registrationHandler.register(user, key);
  }
}
