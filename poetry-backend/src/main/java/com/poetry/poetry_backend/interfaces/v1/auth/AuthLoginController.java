/*
 * File: AuthLoginController.java
 * Purpose: Provide login endpoint with OpenAPI documentation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.auth.usecase.LoginUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "auth", description = "Authentication endpoints")
@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthLoginController {
  private final LoginUseCase login;

  public AuthLoginController(LoginUseCase login) {
    this.login = login;
  }

  @Operation(
      operationId = "login",
      summary = "User login",
      description = "Authenticate user and return tokens")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Login successful"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "401", description = "Invalid credentials")
  })
  @PostMapping("/login")
  public ResponseEntity<AuthDtos.TokenResponse> login(
      @Valid @RequestBody AuthDtos.LoginRequest r) {
    var m = login.execute(r.username(), r.password());
    return ResponseEntity.ok(AuthDtos.toTokenResponse(m));
  }
}
