/*
 * File: TokenGeneratorPort.java
 * Purpose: Defines contract for generating access and refresh tokens.
 * Decouples token issuance logic from business flows enabling different
 * implementations (UUID, JWT, opaque DB-backed) without altering use cases.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.port.support;

import java.util.List;

public interface TokenGeneratorPort {
  String newAccessToken(String subject, List<String> roles);
  String newRefreshToken(String subject);
}
