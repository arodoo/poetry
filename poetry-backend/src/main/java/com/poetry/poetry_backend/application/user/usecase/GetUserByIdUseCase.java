/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
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
