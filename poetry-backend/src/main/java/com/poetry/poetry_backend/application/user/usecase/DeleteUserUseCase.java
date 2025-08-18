/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
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
