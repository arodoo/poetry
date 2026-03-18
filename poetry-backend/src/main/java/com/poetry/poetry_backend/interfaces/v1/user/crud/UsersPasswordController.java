/*
 * File: UsersPasswordController.java
 * Purpose: Admin endpoint to update a user's password.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.auth.port.security.PasswordPolicyPort;
import com.poetry.poetry_backend.application.user.usecase.GetUserByIdUseCase;
import com.poetry.poetry_backend.application.user.usecase.UpdateUserPasswordUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Tag(name = "users", description = "User management")
@RestController
@RequestMapping("/api/v1/users")
public class UsersPasswordController {
  private final UpdateUserPasswordUseCase updatePassword;
  private final GetUserByIdUseCase getUser;
  private final PasswordPolicyPort passwordPolicy;
  private final UserJpaRepository users;

  public UsersPasswordController(
      UpdateUserPasswordUseCase updatePassword,
      GetUserByIdUseCase getUser,
      PasswordPolicyPort passwordPolicy,
      UserJpaRepository users) {
    this.updatePassword = updatePassword;
    this.getUser = getUser;
    this.passwordPolicy = passwordPolicy;
    this.users = users;
  }

  public record UserPasswordUpdateRequest(
      @NotBlank @Size(min = 10, message = "Password must be at least 10 characters")
      String password) { }

  @Operation(
      operationId = "updateUserPassword",
      summary = "Update user password",
      description = "Admin can set a new password for a user with optimistic locking")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Password updated"),
      @ApiResponse(responseCode = "400", description = "Invalid password"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
      @ApiResponse(responseCode = "403", description = "Forbidden"),
      @ApiResponse(responseCode = "404", description = "User not found"),
      @ApiResponse(responseCode = "409", description = "Version conflict")
  })
  @PreAuthorize("hasAuthority('admin')")
  @PutMapping("/{id}/password")
  public ResponseEntity<Void> updatePassword(
      @PathVariable Long id,
      @RequestHeader(value = "If-Match", required = false) String ifMatch,
      @Valid @RequestBody UserPasswordUpdateRequest req) {
    var user = getUser.execute(id);
    long version = user.version();

    UserEntity entity = users.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    passwordPolicy.validate(req.password(), entity.getUsername(), entity.getEmail());

    updatePassword.execute(id, version, req.password());
    return ResponseEntity.noContent().build();
  }
}
