/*
 * File: AuthRegisterController.java
 * Purpose: Provide user registration endpoint with OpenAPI documentation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.auth.usecase.RegisterUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "auth", description = "Authentication endpoints")
@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthRegisterController {
  private final RegisterUseCase register;

  public AuthRegisterController(RegisterUseCase register) {
    this.register = register;
  }

  @Operation(
      operationId = "register",
      summary = "Register new user",
      description = "Create new user account with idempotency support")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Registration successful"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "409", description = "User already exists")
  })
  @PostMapping("/register")
  public ResponseEntity<Object> register(
      @RequestHeader(value = "Idempotency-Key", required = false) String key,
      @Valid @RequestBody AuthDto.RegisterEnvelope body) {
    var user = body.user();
    var payload = user.asMap();
    var m = key == null 
        ? register.execute(payload) 
        : register.execute(payload, key);
    return ResponseEntity.ok(m);
  }
}
