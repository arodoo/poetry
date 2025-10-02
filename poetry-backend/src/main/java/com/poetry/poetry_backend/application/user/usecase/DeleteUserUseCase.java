/*
 * File: DeleteUserUseCase.java
 * Purpose: Encapsulate the logic to soft-delete users by delegating to command
 * ports and ensuring domain rules (such as permissions and audit) are
 * respected. The use case isolates deletion semantics from controllers and
 * provides a central place to apply business rules consistently.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;

public class DeleteUserUseCase {
  private final UserCommandPort commands;

  public DeleteUserUseCase(UserCommandPort commands) {
    this.commands = commands;
  }

  public void execute(Long id, long version) {
    commands.softDelete(id, version);
  }
}
