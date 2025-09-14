/*
 * File: DeleteAuthUseCase.java
 * Purpose: Deletes an Auth aggregate via command port.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

import com.poetry.poetry_backend.application.auth.port.AuthCommandPort;

public class DeleteAuthUseCase {
  private final AuthCommandPort commandPort;

  public DeleteAuthUseCase(AuthCommandPort commandPort) {
    this.commandPort = commandPort;
  }

  public void execute(String id) {
    commandPort.delete(id);
  }
}
