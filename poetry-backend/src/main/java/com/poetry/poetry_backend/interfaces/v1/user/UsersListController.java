/*
 * File: UsersListController.java
 * Purpose: Provide the list users endpoint with method security.
 * Delegates to the list use case and maps to response DTOs. Keeping
 * one-responsibility-per-file enforces our 60-line limit policy and
 * improves maintainability.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.GetAllUsersUseCase;

@RestController
@RequestMapping("/api/v1/users")
public class UsersListController {
  private final GetAllUsersUseCase getAll;
  public UsersListController(GetAllUsersUseCase getAll) { this.getAll = getAll; }

  @GetMapping
  public ResponseEntity<List<UserDtos.UserResponse>> all() {
    var out = getAll.execute().stream()
        .map(UserDtos::toResponse)
        .toList();
    return ResponseEntity.ok(out);
  }
}
