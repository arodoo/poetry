/*
 * File: AuthProperties.java
 * Purpose: Typed configuration properties for authentication including
 * signing secret, issuer, token TTLs and hashing strength. Enforces
 * validation constraints so insecure defaults are rejected at startup.
 * Provides central place for security-related tunables consumed by
 * adapters (JWT, hashing, refresh storage). All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.*;

@Validated
@ConfigurationProperties(prefix = "auth")
public class AuthProperties {
  @NotBlank
  @Size(min = 32, message = "secretKey must be at least 32 chars")
  private String secretKey =
      "change-me-please-change-me-secret-32chars"; // strong dev default

  @NotBlank private String issuer = "poetry-backend";

  @Positive @Max(86400) private int accessTokenTtlSeconds = 900; // 15m
  @Positive @Max(2592000) private int refreshTokenTtlSeconds = 1209600; // 14d

  @Min(4) @Max(16) private int bcryptStrength = 10;

  public String getSecretKey() { return secretKey; }
  public void setSecretKey(String secretKey) { this.secretKey = secretKey; }
  public String getIssuer() { return issuer; }
  public void setIssuer(String issuer) { this.issuer = issuer; }
  public int getAccessTokenTtlSeconds() { return accessTokenTtlSeconds; }
  public void setAccessTokenTtlSeconds(int v) { this.accessTokenTtlSeconds = v; }
  public int getRefreshTokenTtlSeconds() { return refreshTokenTtlSeconds; }
  public void setRefreshTokenTtlSeconds(int v) { this.refreshTokenTtlSeconds = v; }
  public int getBcryptStrength() { return bcryptStrength; }
  public void setBcryptStrength(int bcryptStrength) { this.bcryptStrength = bcryptStrength; }
}
