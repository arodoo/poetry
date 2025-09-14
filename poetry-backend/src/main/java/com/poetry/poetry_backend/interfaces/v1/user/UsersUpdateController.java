/*
 * File: UsersUpdateController.java
 * Purpose: Provide the update user endpoint with method security.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.UpdateUserUseCase;

@RestController
@RequestMapping("/api/v1/users")
public class UsersUpdateController {
  private final UpdateUserUseCase update;
  public UsersUpdateController(UpdateUserUseCase update) { this.update = update; }

  @PutMapping("/{id}")
  public ResponseEntity<UserDtos.UserResponse> update(
      @PathVariable Long id,
      @RequestBody UserDtos.UserUpdateRequest r) {
    var u = update.execute(
        id, r.firstName(), r.lastName(), r.email(),
        r.roles(), r.active());
    return ResponseEntity.ok(UserDtos.toResponse(u));
  }
}
