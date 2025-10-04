/*
 * File: MeController.java
 * Purpose: Expose GET /api/v1/auth/me returning minimal user identity data.
 * Returns 200 with id, username, and roles when authenticated, 401 otherwise.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "auth", description = "Authentication endpoints")
@RestController
@RequestMapping("/api/v1/auth")
public class MeController {
  private final UserJpaRepository userRepository;

  public MeController(UserJpaRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Schema(description = "Current user information")
  public record MeResponse(
      @Schema(description = "User ID", example = "1")
      String id,
      @Schema(description = "Username", example = "admin")
      String username,
      @Schema(description = "User roles", example = "[\"admin\", \"user\"]")
      List<String> roles) {}

  @Operation(
      operationId = "me",
      summary = "Get current user",
      description = "Get authenticated user information")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "User information retrieved"),
    @ApiResponse(responseCode = "401", description = "Not authenticated")
  })
  @GetMapping("/me")
  public ResponseEntity<?> me(Principal principal) {
    if (principal == null) {
      return ResponseEntity.status(401).build();
    }
    String username = principal.getName();
    
    List<String> roles = List.of();
    if (principal instanceof Authentication auth) {
      roles = auth.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .toList();
    }
    
    UserEntity user = userRepository.findActiveByUsername(username)
      .orElse(null);
    if (user == null) {
      return ResponseEntity.status(401).build();
    }
    
    String userId = String.valueOf(user.getId());
    return ResponseEntity.ok(new MeResponse(userId, username, roles));
  }
}
