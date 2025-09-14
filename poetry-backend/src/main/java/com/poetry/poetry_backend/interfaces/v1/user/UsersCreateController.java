/*
 * File: UsersCreateController.java
 * Purpose: Provide the create user endpoint with method security.
 * Delegates to use case and maps request/response DTOs.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.CreateUserUseCase;

@RestController
@RequestMapping("/api/v1/users")
public class UsersCreateController {
  private final CreateUserUseCase create;
  public UsersCreateController(CreateUserUseCase create) { this.create = create; }

  @PostMapping
  public ResponseEntity<UserDtos.UserResponse> create(
      @RequestBody UserDtos.UserCreateRequest r) {
    var u = create.execute(
        r.firstName(), r.lastName(), r.email(),
        r.username(), r.password(), r.roles());
    return ResponseEntity.ok(UserDtos.toResponse(u));
  }
}
