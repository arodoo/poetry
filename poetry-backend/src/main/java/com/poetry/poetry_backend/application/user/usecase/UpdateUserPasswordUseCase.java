/*
 * File: UpdateUserPasswordUseCase.java
 * Purpose: Coordinate password updates for a user. Validates input and
 * delegates to the command port while keeping controllers decoupled.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.core.User;

@Service
public class UpdateUserPasswordUseCase {
  private final UserCommandPort commands;

  public UpdateUserPasswordUseCase(UserCommandPort commands) {
    this.commands = commands;
  }

  public User execute(Long id, long version, String password) {
    return commands.updatePassword(id, version, password);
  }
}
