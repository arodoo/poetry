/*
 * File: MeProfileController.java
 * Purpose: Profile endpoints for current user to read and update their
 * own profile information (username, email, locale). Uses Principal
 * to identify current user and enforces version-based concurrency.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.me;

import java.security.Principal;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RestController
@RequestMapping("/api/v1/me")
@Validated
public class MeProfileController {
  private final UserJpaRepository users;

  public MeProfileController(UserJpaRepository users) {
    this.users = users;
  }

  public record ProfileResponse(
      String username,
      String email,
      String locale,
      Long version) {}

  public record ProfileUpdateRequest(
      @NotBlank @Size(min = 3, max = 50) String username,
      @NotBlank @Email String email,
      @NotBlank @Size(min = 2, max = 10) String locale,
      Long version) {}

  @GetMapping("/profile")
  public ResponseEntity<ProfileResponse> getProfile(Principal principal) {
    if (principal == null || principal.getName() == null) {
      return ResponseEntity.status(401).build();
    }
    Optional<UserEntity> userOpt =
        users.findActiveByUsername(principal.getName());
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(404).build();
    }
    UserEntity user = userOpt.get();
    ProfileResponse response = new ProfileResponse(
        user.getUsername(), user.getEmail(), user.getLocale(),
        user.getVersion());
    return ResponseEntity.ok(response);
  }

  @PutMapping("/profile")
  public ResponseEntity<ProfileResponse> updateProfile(
      @Valid @RequestBody ProfileUpdateRequest req, Principal principal) {
    if (principal == null || principal.getName() == null) {
      return ResponseEntity.status(401).build();
    }
    Optional<UserEntity> userOpt =
        users.findActiveByUsername(principal.getName());
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(404).build();
    }
    UserEntity user = userOpt.get();
    if (!user.getVersion().equals(req.version())) {
      return ResponseEntity.status(412).build();
    }
    user.setEmail(req.email());
    user.setLocale(req.locale());
    UserEntity saved = users.save(user);
    ProfileResponse response = new ProfileResponse(saved.getUsername(),
        saved.getEmail(), saved.getLocale(), saved.getVersion());
    return ResponseEntity.ok(response);
  }
}
