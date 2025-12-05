/*
 * File: MePasswordController.java
 * Purpose: Password change endpoint for the current user.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.me;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.application.auth.port.security.PasswordPolicyPort;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/v1/me")
@Validated
public class MePasswordController {
  private final PasswordHasherPort hasher;
  private final PasswordPolicyPort policy;
  private final UserJpaRepository users;

  public MePasswordController(
      PasswordHasherPort hasher,
      PasswordPolicyPort policy,
      UserJpaRepository users) {
    this.hasher = hasher;
    this.policy = policy;
    this.users = users;
  }

  public record PasswordChangeRequest(
      @NotBlank String currentPassword,
      @NotBlank String newPassword) { }

  @PostMapping("/password")
  public ResponseEntity<Void> changePassword(
      @Valid @RequestBody PasswordChangeRequest req,
      Principal principal) {
    if (principal == null || principal.getName() == null
        || principal.getName().isBlank()) {
      return ResponseEntity.status(401).build();
    }
    var userOpt = users.findActiveByUsername(principal.getName());
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(404).build();
    }
    UserEntity user = userOpt.get();

    // Verify current password matches
    if (!hasher.matches(req.currentPassword(), user.getPasswordHash())) {
      return ResponseEntity.status(403).build();
    }

    // Enforce password policy (uses username/email for contextual checks)
    policy.validate(req.newPassword(), user.getUsername(), user.getEmail());

    // Hash and persist
    String newHash = hasher.hash(req.newPassword());
    user.setPasswordHash(newHash);
    users.save(user);
    return ResponseEntity.noContent().build();
  }
}
