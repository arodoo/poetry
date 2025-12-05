/*
 * File: UserResponse.java
 * Purpose: Response DTO for user data. Decouples internal domain
 * representation from API contract.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user.dto;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.User;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User response representation")
public record UserResponse(
    @Schema(description = "User ID", example = "1")
    Long id,
    @Schema(description = "First name", example = "John")
    String firstName,
    @Schema(description = "Last name", example = "Doe")
    String lastName,
    @Schema(description = "Email address", example = "john.doe@example.com")
    String email,
    @Schema(description = "Username", example = "johndoe")
    String username,
    @Schema(description = "Locale code", example = "en")
    String locale,
    @Schema(description = "Status", example = "active")
    String status,
    @Schema(description = "User roles", example = "[\"admin\", \"user\"]")
    Set<String> roles) {

  public static UserResponse fromDomain(User u) {
    return new UserResponse(
        u.id(),
        u.firstName(),
        u.lastName(),
        u.email(),
        u.username(),
        u.locale(),
        u.status(),
        u.roles());
  }
}
