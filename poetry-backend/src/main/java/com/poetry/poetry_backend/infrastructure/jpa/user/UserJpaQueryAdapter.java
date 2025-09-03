/*
 * File: UserJpaQueryAdapter.java
 * Purpose: Handles user query operations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.List;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;

public class UserJpaQueryAdapter implements UserQueryPort {
  private final UserJpaRepository repo;

  public UserJpaQueryAdapter(UserJpaRepository repo) {
    this.repo = repo;
  }

  public List<com.poetry.poetry_backend.domain.user.model.User> findAll() {
    return repo.findAllActive().stream()
        .map(UserJpaMapper::toDomain)
        .toList();
  }

  public com.poetry.poetry_backend.domain.user.model.User findById(Long id) {
    return repo.findActiveById(id)
        .map(UserJpaMapper::toDomain)
        .orElseThrow(() -> new UserNotFoundException(id));
  }
}