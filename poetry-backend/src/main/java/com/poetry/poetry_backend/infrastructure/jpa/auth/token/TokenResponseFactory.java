/*
 * File: TokenResponseFactory.java
 * Purpose: Builds standard token response maps (accessToken, refreshToken,
 * expiresIn, username, issuedAt) centralizing shape and TTL calculation so
 * action classes stay focused on orchestration. Keeps responses consistent
 * with OpenAPI schema while allowing extension (id, email for register).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.token;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.support.ClockPort;
import com.poetry.poetry_backend.config.auth.AuthProperties;

public class TokenResponseFactory {
  private final ClockPort clock;
  private final AuthProperties props;

  public TokenResponseFactory(ClockPort clock, AuthProperties props) {
    this.clock = clock;
    this.props = props;
  }

  public Map<String, Object> tokens(String username, String access, String refresh) {
    Map<String, Object> m = base(access, refresh);
    if (username != null) {
      m.put("username", username);
    }
    return m;
  }

  public Map<String, Object> register(
      String username, String email, Long id, String access, String refresh) {
    Map<String, Object> m = tokens(username, access, refresh);
    if (id != null) {
      m.put("id", id);
    }
    if (email != null) {
      m.put("email", email);
    }
    return m;
  }

  private Map<String, Object> base(String access, String refresh) {
    Map<String, Object> m = new HashMap<>();
    m.put("accessToken", access);
    m.put("refreshToken", refresh);
    m.put("expiresIn", props.getAccessTokenTtlSeconds());
    m.put("issuedAt", Instant.from(clock.now()).toString());
    return m;
  }
}
