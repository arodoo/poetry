/*
 * File: RegisterTokenIssuanceSupport.java
 * Purpose: Issues access and refresh tokens for newly registered
 * users and records audit trail entries. Keeps security token
 * concerns cohesive and decoupled from orchestration. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.action;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.RefreshTokenManager;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.TokenResponseFactory;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;

final class RegisterTokenIssuanceSupport {
  private final TokenGeneratorPort tokens;
  private final RefreshTokenManager manager;
  private final AuditLoggerPort audit;
  private final TokenResponseFactory factory;

  RegisterTokenIssuanceSupport(
      TokenGeneratorPort tokens,
      RefreshTokenManager manager,
      AuditLoggerPort audit,
      TokenResponseFactory factory) {
    this.tokens = tokens;
    this.manager = manager;
    this.audit = audit;
    this.factory = factory;
  }

  Map<String, Object> issue(String username, String email, UserEntity user) {
    java.util.List<String> rolesList = user.getRoles() == null
        ? java.util.List.of()
        : new java.util.ArrayList<>(user.getRoles());
    String access = tokens.newAccessToken(username, rolesList);
    String refresh = manager.issue(user.getId(), null);
    audit.record("register", username, "created");
    return factory.register(username, email, user.getId(), access, refresh);
  }
}
