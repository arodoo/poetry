/*
 * File: AuthLogoutController.java
 * Purpose: Provide logout endpoint with OpenAPI documentation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.auth.usecase.LogoutUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "auth", description = "Authentication endpoints")
@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthLogoutController {
  private final LogoutUseCase logout;

  public AuthLogoutController(LogoutUseCase logout) {
    this.logout = logout;
  }

  @Operation(
      operationId = "logout",
      summary = "User logout",
      description = "Invalidate refresh token and log out user")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "204", description = "Logout successful"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "401", description = "Invalid token")
  })
  @PostMapping("/logout")
  public ResponseEntity<Void> logout(
      @Valid @RequestBody AuthDtos.RefreshRequest r) {
    logout.execute(r.refreshToken());
    return ResponseEntity.noContent().build();
  }
}
