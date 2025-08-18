/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.usecase;

import java.util.Set;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.User;

public class CreateUserUseCase {
  private final UserCommandPort commands;

  public CreateUserUseCase(UserCommandPort commands) {
    this.commands = commands;
  }

  public User execute(
      String firstName,
      String lastName,
      String email,
      String username,
      String password,
      Set<String> roles) {
    return commands.create(
        firstName, lastName, email, username, password, roles);
  }
}
