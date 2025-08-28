/*
 * File: AuthProperties.java
 * Purpose: Typed configuration properties for authentication including
 * signing secret, issuer, token TTLs and hashing strength. Enforces
 * validation constraints so insecure defaults are rejected at startup.
 * Provides central place for security-related tunables consumed by
 * adapters (JWT, hashing, refresh storage). All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.auth;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Validated
@ConfigurationProperties(prefix = "auth")
@Getter
@Setter
public class AuthProperties { // Reduced via Lombok to satisfy max-lines rule.
  @NotBlank
  @Size(min = 32, message = "{cfg.auth.secret.min-length}")
  private String secretKey = "change-me-please-change-me-secret-32chars";
  private String previousSecretKey; // may be null
  @PositiveOrZero
  @Max(86400)
  private int rotationOverlapSeconds = 0; // 0 means disabled
  @Positive
  @Max(7776000)
  private int maxSecretAgeSeconds = 2592000; // 30d
  private String secretIssuedAt; // optional metadata
  @NotBlank
  private String issuer = "poetry-backend";
  @Positive
  @Max(86400)
  private int accessTokenTtlSeconds = 900; // 15m
  @Positive
  @Max(2592000)
  private int refreshTokenTtlSeconds = 1209600; // 14d
  @Min(4)
  @Max(16)
  private int bcryptStrength = 10;
  // Validation of secret-related policies handled by AuthPropertiesValidator.
}
