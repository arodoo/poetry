/*
 * File: UpdateUserUseCase.java
 * Purpose: Coordinate user updates by validating input, applying
 * changes via user command ports and returning the updated domain
 * object. When status transitions to 'inactive' the cascade
 * service cleans up related entities (fingerprints, memberships,
 * seller codes, demographics).
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import java.util.Set;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.service.UserCascadeService;
import com.poetry.poetry_backend.domain.user.model.core.User;

public class UpdateUserUseCase {
  private final UserCommandPort commands;
  private final UserCascadeService cascade;

  public UpdateUserUseCase(
      UserCommandPort commands,
      UserCascadeService cascade) {
    this.commands = commands;
    this.cascade = cascade;
  }

  public User execute(
      Long id,
      long version,
      String firstName,
      String lastName,
      String email,
      String locale,
      Set<String> roles,
      String status) {
    User updated = commands.update(
        id, version, firstName, lastName,
        email, locale, roles, status);
    if ("inactive".equalsIgnoreCase(status)) {
      cascade.cascadeDeactivate(id);
    }
    return updated;
  }
}
