/*
 * File: UpdateUserUseCase.java
 * Purpose: Coordinate user updates by validating input, applying changes via
 * user command ports and returning the updated domain object. The use case
 * enforces business rules while keeping controllers and infrastructure
 * decoupled for testability.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import java.util.Set;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.User;

public class UpdateUserUseCase {
  private final UserCommandPort commands;

  public UpdateUserUseCase(UserCommandPort commands) {
    this.commands = commands;
  }

  public User execute(
      Long id,
      long version,
      String firstName,
      String lastName,
      String email,
      String locale,
      Set<String> roles,
      boolean active) {
    return commands.update(
        id,
        version,
        firstName,
        lastName,
        email,
        locale,
        roles,
        active);
  }
}
