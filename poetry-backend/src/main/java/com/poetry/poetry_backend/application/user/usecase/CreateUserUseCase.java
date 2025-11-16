/*
 * File: CreateUserUseCase.java
 * Purpose: Coordinate the creation of new users by validating input, using
 * domain rules and interacting with user command ports to persist the new
 * user. The use case returns the created domain object and isolates
 * side-effects from controllers so logic can be tested in isolation.
 * All Rights Reserved. Arodi Emmanuel
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
      String locale,
      String password,
      Set<String> roles,
      String status) {
    User created = commands.create(
        firstName, lastName, email, username, locale, password, roles,
        status);

    return created;
  }
}
