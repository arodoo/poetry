/*
 File: DeleteUserUseCase.java
 Purpose: Performs soft deletion of a user in the Application layer. It
   delegates to UserCommandPort to disable the account without
   permanently removing records. This preserves auditability and aligns
   with the soft-delete policy across entities.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;

public class DeleteUserUseCase {
  private final UserCommandPort commands;

  public DeleteUserUseCase(UserCommandPort commands) {
    this.commands = commands;
  }

  public void execute(Long id) {
    commands.softDelete(id);
  }
}
