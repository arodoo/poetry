/*
 * File: UsersGetController.java
 * Purpose: Provide the get user by id endpoint with method security.
 * Keeps controller small and focused per endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.GetUserByIdUseCase;

@RestController
@RequestMapping("/api/v1/users")
public class UsersGetController {
  private final GetUserByIdUseCase getById;
  public UsersGetController(GetUserByIdUseCase getById) { this.getById = getById; }

  @GetMapping("/{id}")
  @PreAuthorize("hasAnyAuthority('admin','manager','user')")
  public ResponseEntity<UserDtos.UserResponse> byId(@PathVariable Long id) {
    var u = getById.execute(id);
    return ResponseEntity.ok(UserDtos.toResponse(u));
  }
}
