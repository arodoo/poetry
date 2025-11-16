/*
 * File: UsersCreateController.java
 * Purpose: Provide the create user endpoint with method security.
 * Delegates to use case and maps request/response DTOs.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.CreateUserUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "users", description = "User management")
@RestController
@RequestMapping("/api/v1/users")
public class UsersCreateController {
  private final CreateUserUseCase create;
  public UsersCreateController(CreateUserUseCase create) { this.create = create; }

  @Operation(
      operationId = "createUser",
      summary = "Create a new user",
      description = "Create user with role assignment")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "201", description = "Created"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden")
  })
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping
  public ResponseEntity<UserResponse> create(
      @RequestBody UserCreateRequest r) {
    validatePasswordRequirement(r.roles(), r.password());
    var u = create.execute(
        r.firstName(), r.lastName(), r.email(),
        r.username(), r.locale(), r.password(), r.roles(),
        r.status());
    return ResponseEntity.status(201).body(UserDto.toResponse(u));
  }

  private void validatePasswordRequirement(
      java.util.Set<String> roles, String password) {
    if (roles == null || roles.isEmpty()) {
      return;
    }
    boolean needsPassword = roles.stream()
        .anyMatch(r -> "ADMIN".equalsIgnoreCase(r) 
            || "MANAGER".equalsIgnoreCase(r));
    if (needsPassword && (password == null || password.isBlank())) {
      throw new IllegalArgumentException(
          "Password is required for ADMIN and MANAGER roles");
    }
  }
}
