/*
 * File: UuidTokenGenerator.java
 * Purpose: Simple token generator producing random UUID based access and
 * refresh tokens. Provides deterministic, dependency-free implementation
 * for tests while enabling later replacement with JWT signing adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.util.UUID;

import com.poetry.poetry_backend.application.auth.port.TokenGeneratorPort;

public class UuidTokenGenerator implements TokenGeneratorPort {
  public String newAccessToken(String subject) { return "atk-" + UUID.randomUUID(); }
  public String newRefreshToken(String subject) { return "rtk-" + UUID.randomUUID(); }
}
