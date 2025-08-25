/*
 * File: AuthController.java
 * Purpose: Exposes authentication endpoints for versioned API v1.
 * This controller handles login, token issuance, and related auth
 * flows while delegating business logic to application services.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.auth;

import static com.poetry.poetry_backend.interfaces.v1.auth.AuthDtos.*;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.auth.usecase.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthController {
  private final LoginUseCase login;
  private final RefreshTokenUseCase refresh;
  private final LogoutUseCase logout;
  private final RegisterUseCase register;

  public AuthController(
      LoginUseCase login,
      RefreshTokenUseCase refresh,
      LogoutUseCase logout,
      RegisterUseCase register) {
    this.login = login;
    this.refresh = refresh;
    this.logout = logout;
    this.register = register;
  }

  @PostMapping("/login")
  public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest r) {
    var m = login.execute(r.username(), r.password());
    return ResponseEntity.ok(AuthDtos.toTokenResponse(m));
  }

  @PostMapping("/refresh")
  public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody RefreshRequest r) {
    var m = refresh.execute(r.refreshToken());
    return ResponseEntity.ok(AuthDtos.toTokenResponse(m));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(@Valid @RequestBody RefreshRequest r) {
    logout.execute(r.refreshToken());
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/register")
  public ResponseEntity<Object> register(
      @RequestHeader(value = "Idempotency-Key", required = false) String key,
      @Valid @RequestBody RegisterEnvelope body) {
    var user = body.user();
    var payload = user.asMap();
    var m = key == null ? register.execute(payload) : register.execute(payload, key);
    return ResponseEntity.ok(m);
  }
}
