/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
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
