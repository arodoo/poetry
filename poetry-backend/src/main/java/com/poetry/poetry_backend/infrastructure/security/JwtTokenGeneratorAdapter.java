/*
 * File: JwtTokenGeneratorAdapter.java
 * Purpose: Adapter generating signed JWT access tokens and opaque
 * refresh token values. Uses JJWT for signing with HS256 keyed by
 * AuthProperties.secretKey. Refresh tokens are random UUIDs persisted.
 * Keeps JWT specifics out of application layer. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.config.auth.AuthProperties;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtTokenGeneratorAdapter implements TokenGeneratorPort {
  private final SecretKey currentKey;
  private final SecretKey previousKey; // optional
  private final AuthProperties props;

  public JwtTokenGeneratorAdapter(AuthProperties props) {
    this.props = props;
    this.currentKey = Keys.hmacShaKeyFor(props.getSecretKey().getBytes(StandardCharsets.UTF_8));
    this.previousKey = props.getPreviousSecretKey() == null ? null
        : Keys.hmacShaKeyFor(props.getPreviousSecretKey().getBytes(StandardCharsets.UTF_8));
  }

  public String newAccessToken(String subject, java.util.List<String> roles) {
    Instant now = Instant.now();
    Instant exp = now.plusSeconds(props.getAccessTokenTtlSeconds());
    return Jwts.builder()
        .setSubject(subject)
        .claim("roles", roles)
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(exp))
        .setIssuer(props.getIssuer())
        .setId(UUID.randomUUID().toString())
        .signWith(currentKey)
        .compact();
  }

  public String newRefreshToken(String subject) {
    return UUID.randomUUID().toString();
  }

  public boolean canVerifyWithPrevious() {
    return previousKey != null && props.getRotationOverlapSeconds() > 0;
  }
}
