/*
 * File: DeleteUserUseCase.java
 * Purpose: Soft-delete a user and cascade to all owned entities
 * via UserCascadeService. Ensures no orphan data remains after
 * account removal.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.service.UserCascadeService;

public class DeleteUserUseCase {
  private final UserCommandPort commands;
  private final UserCascadeService cascade;

  public DeleteUserUseCase(
      UserCommandPort commands,
      UserCascadeService cascade) {
    this.commands = commands;
    this.cascade = cascade;
  }

  public void execute(Long id, long version) {
    commands.softDelete(id, version);
    cascade.cascadeDeactivate(id);
  }
}
