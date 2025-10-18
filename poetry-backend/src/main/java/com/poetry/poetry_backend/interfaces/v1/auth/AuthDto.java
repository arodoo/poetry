/*
 * File: AuthDto.java
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

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public final class AuthDto {
  @Schema(description = "Login request with credentials")
  public record LoginRequest(
      @NotBlank
      @Schema(description = "Username", example = "admin", requiredMode = Schema.RequiredMode.REQUIRED)
      String username,
      @NotBlank
      @Schema(description = "Password", example = "SecurePass123!", requiredMode = Schema.RequiredMode.REQUIRED)
      String password) { }

  @Schema(description = "Authentication token response")
  public record TokenResponse(
      @Schema(description = "JWT access token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
      String accessToken,
      @Schema(description = "JWT refresh token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
      String refreshToken,
      @Schema(description = "Token expiration time in seconds", example = "3600")
      Integer expiresIn,
      @Schema(description = "Username of authenticated user", example = "admin")
      String username) { }

  @Schema(description = "Token refresh request")
  public record RefreshRequest(
      @NotBlank
      @Schema(description = "Refresh token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", requiredMode = Schema.RequiredMode.REQUIRED)
      String refreshToken) { }

  @Schema(description = "User registration request")
  public record RegisterRequest(
      @NotBlank
      @Schema(description = "Username", example = "newuser", requiredMode = Schema.RequiredMode.REQUIRED)
      String username,
      @Email
      @NotBlank
      @Schema(description = "Email address", example = "user@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
      String email,
      @NotBlank
      @Schema(description = "Password", example = "SecurePass123!", requiredMode = Schema.RequiredMode.REQUIRED)
      String password) {
    public Map<String, Object> asMap() {
      return Map.of(
          "username", username,
          "email", email,
          "password", password);
    }
  }

  // Wrapper to match incoming JSON shape {"user": {"username":..., "email":..., "password":...}}
  @Schema(description = "Registration envelope wrapping user data")
  public record RegisterEnvelope(
      @Valid
      @Schema(description = "User registration data", requiredMode = Schema.RequiredMode.REQUIRED)
      RegisterRequest user) { }

  static TokenResponse toTokenResponse(Map<String, Object> m) {
    return new TokenResponse(
        (String) m.get("accessToken"),
        (String) m.get("refreshToken"),
        (Integer) m.get("expiresIn"),
        (String) m.getOrDefault("username", null));
  }
}
