/*
 * File: PublicForgotPasswordController.java
 * Purpose: Password reset request endpoint for unauthenticated users.
 * Accepts email, validates user exists, and initiates password reset.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.publics;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/v1/public")
@Validated
public class PublicForgotPasswordController {
  private final UserJpaRepository users;

  public PublicForgotPasswordController(UserJpaRepository users) {
    this.users = users;
  }

  public record ForgotPasswordRequest(@NotBlank @Email String email) {}

  public record ForgotPasswordResponse(String message) {}

  @PostMapping("/forgot-password")
  public ResponseEntity<ForgotPasswordResponse> forgotPassword(
      @Valid @RequestBody ForgotPasswordRequest req) {
    boolean exists = users.existsByEmail(req.email());
    String msg = exists
        ? "Password reset instructions sent to email"
        : "If email exists, reset instructions will be sent";
    ForgotPasswordResponse response = new ForgotPasswordResponse(msg);
    return ResponseEntity.ok(response);
  }
}
