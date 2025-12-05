/*
 * File: CreateAuthUseCase.java
 * Purpose: Creates an Auth aggregate via command port.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase.crud;

import com.poetry.poetry_backend.application.auth.port.AuthCommandPort;
import com.poetry.poetry_backend.domain.auth.model.Auth;

public class CreateAuthUseCase {
  private final AuthCommandPort commandPort;

  public CreateAuthUseCase(AuthCommandPort commandPort) {
    this.commandPort = commandPort;
  }

  public Auth execute(String id, String username) {
    return commandPort.create(id, username);
  }
}
