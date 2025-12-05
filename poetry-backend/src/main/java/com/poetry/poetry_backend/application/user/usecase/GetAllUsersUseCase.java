/*
 * File: GetAllUsersUseCase.java
 * Purpose: Retrieve all users via the user query port and apply any
 * application-level mapping, filtering or sorting necessary for the caller.
 * This use case centralizes read logic so controllers can remain thin and
 * mapping logic is testable.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.model.core.User;

public class GetAllUsersUseCase {
  private final UserQueryPort query;

  public GetAllUsersUseCase(UserQueryPort query) {
    this.query = query;
  }

  public List<User> execute() {
    return query.findAll();
  }
}
