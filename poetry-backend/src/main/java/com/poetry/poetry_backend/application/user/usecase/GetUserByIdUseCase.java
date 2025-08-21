/*
 * File: GetUserByIdUseCase.java
 * Purpose: Retrieve a single user by identifier and apply application-level
 * validations or mapping. This use case hides persistence and lookup details
 * from controllers and coordinates error handling for missing users.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.model.User;

public class GetUserByIdUseCase {
  private final UserQueryPort query;

  public GetUserByIdUseCase(UserQueryPort query) {
    this.query = query;
  }

  public User execute(Long id) {
    return query.findById(id);
  }
}
