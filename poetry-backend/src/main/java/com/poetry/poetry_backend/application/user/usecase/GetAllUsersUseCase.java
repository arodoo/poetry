/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.model.User;

public class GetAllUsersUseCase {
  private final UserQueryPort query;

  public GetAllUsersUseCase(UserQueryPort query) {
    this.query = query;
  }

  public List<User> execute() {
    return query.findAll();
  }
}
