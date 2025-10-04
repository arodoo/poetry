/*
 * File: UserDtos.java
 * Purpose: DTO classes used by user endpoints to represent request
 * and response payloads independently from the domain model. Using
 * DTOs ensures clear API contracts and enables versioning and
 * validation at the boundary.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.User;

import io.swagger.v3.oas.annotations.media.Schema;

public final class UserDtos {
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
      @Schema(description = "Active status")
      boolean active,
      @Schema(description = "User roles", example = "[\"admin\", \"user\"]")
      Set<String> roles) { }

  @Schema(description = "User update request")
  public record UserUpdateRequest(
      @Schema(description = "First name", example = "John")
      String firstName, 
      @Schema(description = "Last name", example = "Doe")
      String lastName, 
      @Schema(description = "Email address", example = "john.doe@example.com")
      String email,
      @Schema(description = "Locale code", example = "en")
      String locale,
      @Schema(description = "User roles", example = "[\"admin\", \"user\"]")
      Set<String> roles, 
      @Schema(description = "Active status")
      boolean active) { }

  @Schema(description = "User creation request")
  public record UserCreateRequest(
      @Schema(description = "First name", example = "John", requiredMode = Schema.RequiredMode.REQUIRED)
      String firstName,
      @Schema(description = "Last name", example = "Doe", requiredMode = Schema.RequiredMode.REQUIRED)
      String lastName,
      @Schema(description = "Email address", example = "john.doe@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
      String email,
      @Schema(description = "Username", example = "johndoe", requiredMode = Schema.RequiredMode.REQUIRED)
      String username,
      @Schema(description = "Locale code", example = "en")
      String locale,
      @Schema(description = "Password", example = "SecurePass123!", requiredMode = Schema.RequiredMode.REQUIRED)
      String password,
      @Schema(description = "User roles", example = "[\"user\"]")
      Set<String> roles) { }

  public static UserResponse toResponse(User u) {
    return new UserResponse(
                u.id(),
                u.firstName(),
                u.lastName(),
                u.email(),
                u.username(),
                u.locale(),
                u.active(),
                u.roles());
  }
}
