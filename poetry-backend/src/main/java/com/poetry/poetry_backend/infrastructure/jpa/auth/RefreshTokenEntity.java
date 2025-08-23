/*
 * File: RefreshTokenEntity.java
 * Purpose: JPA entity representing a persisted refresh token bound to a
 * user. Stores rotation chain (parent), expiry, status and revocation
 * metadata enabling secure single-use token rotation and misuse
 * detection logic inside the auth adapter. All Rights Reserved. Arodi
 * Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = "auth_refresh_tokens", indexes = {
    @Index(name = "idx_refresh_token_value", columnList = "tokenValue", unique = true),
    @Index(name = "idx_refresh_user_status", columnList = "userId,status") })
public class RefreshTokenEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false)
  private Long userId;
  @Column(nullable = false, length = 128)
  private String tokenValue;
  @Column(length = 128)
  private String parentTokenValue;
  @Column(nullable = false)
  private Instant issuedAt;
  @Column(nullable = false)
  private Instant expiresAt;
  @Column(nullable = false, length = 16)
  private String status; // ACTIVE, ROTATED, REVOKED
  private Instant rotatedAt;
  private Instant revokedAt;
  private String revokeReason;

  public Long getId() { return id; }
  public Long getUserId() { return userId; }
  public void setUserId(Long userId) { this.userId = userId; }
  public String getTokenValue() { return tokenValue; }
  public void setTokenValue(String tokenValue) { this.tokenValue = tokenValue; }
  public String getParentTokenValue() { return parentTokenValue; }
  public void setParentTokenValue(String parentTokenValue) {
    this.parentTokenValue = parentTokenValue;
  }
  public Instant getIssuedAt() { return issuedAt; }
  public void setIssuedAt(Instant issuedAt) { this.issuedAt = issuedAt; }
  public Instant getExpiresAt() { return expiresAt; }
  public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public Instant getRotatedAt() { return rotatedAt; }
  public void setRotatedAt(Instant rotatedAt) { this.rotatedAt = rotatedAt; }
  public Instant getRevokedAt() { return revokedAt; }
  public void setRevokedAt(Instant revokedAt) { this.revokedAt = revokedAt; }
  public String getRevokeReason() { return revokeReason; }
  public void setRevokeReason(String revokeReason) { this.revokeReason = revokeReason; }
}
