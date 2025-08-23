/*
 * File: RefreshTokenRepository.java
 * Purpose: Spring Data repository for refresh token persistence. Exposes
 * queries required by application services to fetch active tokens, detect
 * misuse and bulk revoke a user's active tokens. Keeps DB access abstracted
 * behind an interface aligned with domain-driven requirements.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface RefreshTokenRepository
        extends JpaRepository<RefreshTokenEntity, Long> {
    Optional<RefreshTokenEntity> findByTokenValue(String tokenValue);

    @Query(
        "select t from RefreshTokenEntity t " +
        "where t.userId = :uid and t.status = 'ACTIVE'")
    List<RefreshTokenEntity> findActiveByUserId(Long uid);

    @Modifying
    @Query(
        "update RefreshTokenEntity t set t.status='REVOKED', " +
        "t.revokedAt=:now, t.revokeReason=:r " +
        "where t.userId=:uid and t.status='ACTIVE'")
    int revokeAllActive(Long uid, Instant now, String r);
}
