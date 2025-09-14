/*
 * File: UsersDeleteController.java
 * Purpose: Provide the delete user endpoint with method security.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.DeleteUserUseCase;

@RestController
@RequestMapping("/api/v1/users")
public class UsersDeleteController {
  private final DeleteUserUseCase delete;
  public UsersDeleteController(DeleteUserUseCase delete) { this.delete = delete; }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    delete.execute(id);
    return ResponseEntity.noContent().build();
  }
}
