/*
 File: UpdateUserUseCase.java
 Purpose: Applies user profile updates in the Application layer. It
   delegates to UserCommandPort, ensuring the change operation is a
   cohesive unit without HTTP or DB concerns. The method returns the
   updated domain model with new attributes and activation state.
 All Rights Reserved. Arodi Emmanuel
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
      String firstName,
      String lastName,
      String email,
      Set<String> roles,
      boolean active) {
    return commands.update(id, firstName, lastName, email, roles, active);
  }
}
