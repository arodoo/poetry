/*
 * File: RefreshTokenManager.java
 * Purpose: Orchestrates refresh token lifecycle: issuance, single-use
 * rotation, misuse detection and logout revocation. Delegates specific
 * operations to focused helper classes (issuer, revoker) to maintain
 * file size constraints while preserving all lifecycle logic.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.time.Instant;

import com.poetry.poetry_backend.application.auth.exception.InvalidRefreshTokenException;
import com.poetry.poetry_backend.application.auth.port.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.ClockPort;
import com.poetry.poetry_backend.application.auth.port.TokenGeneratorPort;
import com.poetry.poetry_backend.config.AuthProperties;

class RefreshTokenManager {

  record RotateResult(Long userId, String newToken) { }

  private final RefreshTokenRepository repository;
  private final ClockPort clock;
  private final AuditLoggerPort auditLogger;
  private final RefreshTokenIssuer issuer;
  private final RefreshTokenRevoker revoker;

  RefreshTokenManager(
      RefreshTokenRepository repository,
      ClockPort clock,
      TokenGeneratorPort tokenGenerator,
      AuthProperties properties,
      AuditLoggerPort auditLogger) {
    this.repository = repository;
    this.clock = clock;
    this.auditLogger = auditLogger;
    this.issuer = new RefreshTokenIssuer(
        repository, clock, tokenGenerator, properties, auditLogger);
    this.revoker = new RefreshTokenRevoker(repository, clock, auditLogger);
  }

  String issue(Long userId, String parentTokenValue) {
    return issuer.issue(userId, parentTokenValue);
  }

  RotateResult rotate(String tokenValue) {
    RefreshTokenEntity entity =
        repository.findByTokenValue(tokenValue).orElseThrow(() -> fail("not_found"));
    Instant now = clock.now();
    if (!"ACTIVE".equals(entity.getStatus()) || entity.getExpiresAt().isBefore(now)) {
      return misuse(entity, now, "inactive_or_expired");
    }
    entity.setStatus("ROTATED");
    entity.setRotatedAt(now);
    String newValue = issuer.issue(entity.getUserId(), entity.getTokenValue());
    auditLogger.record(
        "refresh.rotate", String.valueOf(entity.getUserId()), "rotated");
    return new RotateResult(entity.getUserId(), newValue);
  }

  void logout(String refreshToken) {
    revoker.logout(refreshToken);
  }

  private InvalidRefreshTokenException fail(String reason) {
    auditLogger.record("refresh.rotate.fail", "?", reason);
    return new InvalidRefreshTokenException("invalid");
  }

  private RotateResult misuse(
      RefreshTokenEntity entity, Instant now, String reason) {
    revoker.revokeAllActive(entity.getUserId(), reason);
    throw new InvalidRefreshTokenException("invalid");
  }
}
