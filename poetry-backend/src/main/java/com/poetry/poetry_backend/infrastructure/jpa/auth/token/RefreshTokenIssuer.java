/*
 * File: RefreshTokenIssuer.java
 * Purpose: Handles refresh token creation and persistence with proper
 * metadata (parent token, expiry, status). Centralizes token issuance
 * logic to keep RefreshTokenManager focused on lifecycle orchestration.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.token;

import java.time.Instant;

import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.support.ClockPort;
import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.config.auth.support.AuthProperties;
import com.poetry.poetry_backend.infrastructure.jpa.auth.entity.RefreshTokenEntity;
import com.poetry.poetry_backend.infrastructure.jpa.auth.repository.RefreshTokenRepository;

class RefreshTokenIssuer {
  private final RefreshTokenRepository repository;
  private final ClockPort clock;
  private final TokenGeneratorPort tokenGenerator;
  private final AuthProperties properties;
  private final AuditLoggerPort auditLogger;

  RefreshTokenIssuer(
      RefreshTokenRepository repository,
      ClockPort clock,
      TokenGeneratorPort tokenGenerator,
      AuthProperties properties,
      AuditLoggerPort auditLogger) {
    this.repository = repository;
    this.clock = clock;
    this.tokenGenerator = tokenGenerator;
    this.properties = properties;
    this.auditLogger = auditLogger;
  }

  String issue(Long userId, String parentTokenValue) {
    RefreshTokenEntity entity = new RefreshTokenEntity();
    entity.setUserId(userId);
    entity.setParentTokenValue(parentTokenValue);
    Instant now = clock.now();
    entity.setIssuedAt(now);
    entity.setExpiresAt(
        now.plusSeconds(properties.getRefreshTokenTtlSeconds()));
    entity.setStatus("ACTIVE");
    String value = tokenGenerator.newRefreshToken(String.valueOf(userId));
    entity.setTokenValue(value);
    repository.save(entity);
    auditLogger.record("refresh.issue", String.valueOf(userId), "active");
    return value;
  }
}
