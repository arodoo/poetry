/*
 * File: AuthDtos.java
 * Purpose: Data transfer objects used by authentication endpoints
 * to decouple transport from domain models and provide validation
 * contracts. DTOs centralize request and response shapes for auth
 * flows and reduce coupling between layers. Updated to match OpenAPI
 * schema (accessToken, refreshToken, expiresIn) and include optional
 * username for login responses. Extended with bean validation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.auth;

import java.util.Map;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public final class AuthDtos {
  public record LoginRequest(@NotBlank String username, @NotBlank String password) { }

  public record TokenResponse(
      String accessToken,
      String refreshToken,
      Integer expiresIn,
      String username) { }

  public record RefreshRequest(@NotBlank String refreshToken) { }

  public record RegisterRequest(
      @NotBlank String username,
      @Email @NotBlank String email,
      @NotBlank String password) {
    public Map<String, Object> asMap() {
      return Map.of(
          "username", username,
          "email", email,
          "password", password);
    }
  }

  // Wrapper to match incoming JSON shape {"user": {"username":..., "email":..., "password":...}}
  public record RegisterEnvelope(@Valid RegisterRequest user) { }

  static TokenResponse toTokenResponse(Map<String, Object> m) {
    return new TokenResponse(
        (String) m.get("accessToken"),
        (String) m.get("refreshToken"),
        (Integer) m.get("expiresIn"),
        (String) m.getOrDefault("username", null));
  }
}
