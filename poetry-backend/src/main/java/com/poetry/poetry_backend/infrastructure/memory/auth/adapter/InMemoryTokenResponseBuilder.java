/*
 * File: InMemoryTokenResponseBuilder.java
 * Purpose: Builds token response maps for in-memory auth adapter with
 * consistent shape (accessToken, refreshToken, expiresIn, username, issuedAt).
 * Extracted from InMemoryAuthAdapter to comply with file size limits.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth.adapter;

import java.util.HashMap;
import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.support.ClockPort;
import com.poetry.poetry_backend.config.auth.AuthProperties;

class InMemoryTokenResponseBuilder {
  private final ClockPort clock;
  private final AuthProperties props;

  InMemoryTokenResponseBuilder(ClockPort clock, AuthProperties props) {
    this.clock = clock;
    this.props = props;
  }

  Map<String, Object> build(String username, String accessToken, String refreshToken) {
    long exp = props.getAccessTokenTtlSeconds();
    Map<String, Object> m = new HashMap<>();
    m.put("accessToken", accessToken);
    m.put("refreshToken", refreshToken);
    m.put("expiresIn", (int) exp);
    if (username != null) {
      m.put("username", username);
    }
    m.put("issuedAt", clock.now().toString());
    return m;
  }
}
