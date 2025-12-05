/*
 * File: RefreshTokenRevoker.java
 * Purpose: Handles refresh token revocation operations including
 * bulk active token revocation for logout and misuse scenarios.
 * Encapsulates revocation logic to keep RefreshTokenManager small.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.token;

import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.support.ClockPort;
import com.poetry.poetry_backend.infrastructure.jpa.auth.entity.RefreshTokenEntity;
import com.poetry.poetry_backend.infrastructure.jpa.auth.repository.RefreshTokenRepository;

class RefreshTokenRevoker {
  private final RefreshTokenRepository repository;
  private final ClockPort clock;
  private final AuditLoggerPort auditLogger;

  RefreshTokenRevoker(
      RefreshTokenRepository repository,
      ClockPort clock,
      AuditLoggerPort auditLogger) {
    this.repository = repository;
    this.clock = clock;
    this.auditLogger = auditLogger;
  }

  void revokeAllActive(Long userId, String reason) {
    repository.revokeAllActive(userId, clock.now(), reason);
    auditLogger.record(
        "refresh.misuse", String.valueOf(userId), reason);
  }

  void logout(String refreshToken) {
    RefreshTokenEntity entity = repository.findByTokenValue(refreshToken).orElse(null);
    if (entity == null) {
      return;
    }
    repository.revokeAllActive(entity.getUserId(), clock.now(), "logout");
    auditLogger.record(
        "refresh.logout", String.valueOf(entity.getUserId()), "revoked_all");
  }
}
