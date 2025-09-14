/*
 * File: UpdateAuthUseCase.java
 * Purpose: Updates an Auth aggregate via command port.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

import com.poetry.poetry_backend.application.auth.port.AuthCommandPort;
import com.poetry.poetry_backend.domain.auth.model.Auth;

public class UpdateAuthUseCase {
  private final AuthCommandPort commandPort;

  public UpdateAuthUseCase(AuthCommandPort commandPort) {
    this.commandPort = commandPort;
  }

  public Auth execute(String id, String username) {
    return commandPort.update(id, username);
  }
}
