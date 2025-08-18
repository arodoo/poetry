/*
 File: AuthDtos.java
 Purpose: Declares request and response DTOs for auth endpoints. These
   records shape the external API and keep controllers free from map
   manipulation. Conversion helpers centralize mapping to reduce reuse
   and drift from OpenAPI contracts.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.interfaces.v1.auth;

import java.util.Map;

public final class AuthDtos {
  public record LoginRequest(String username, String password) { }

  public record TokenResponse(String token, String username) { }

  public record RefreshRequest(String refreshToken) { }

  public record RegisterRequest(Map<String, Object> user) { }

  static TokenResponse toTokenResponse(Map<String, Object> m) {
    return new TokenResponse(
        (String) m.get("token"), 
        (String) m.getOrDefault("username", "")
    );
  }
}
