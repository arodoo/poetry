/*
 * File: AuthRefreshController.java
 * Purpose: Provide token refresh endpoint with OpenAPI documentation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.auth.usecase.RefreshTokenUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "auth", description = "Authentication endpoints")
@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthRefreshController {
  private final RefreshTokenUseCase refresh;

  public AuthRefreshController(RefreshTokenUseCase refresh) {
    this.refresh = refresh;
  }

  @Operation(
      operationId = "refresh",
      summary = "Refresh access token",
      description = "Get new access token using refresh token")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Token refreshed"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "401", description = "Invalid refresh token")
  })
  @PostMapping("/refresh")
  public ResponseEntity<AuthDtos.TokenResponse> refresh(
      @Valid @RequestBody AuthDtos.RefreshRequest r) {
    var m = refresh.execute(r.refreshToken());
    return ResponseEntity.ok(AuthDtos.toTokenResponse(m));
  }
}
