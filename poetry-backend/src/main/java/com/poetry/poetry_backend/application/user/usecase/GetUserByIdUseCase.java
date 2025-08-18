/*
 File: GetUserByIdUseCase.java
 Purpose: Retrieves a single user by identifier in the Application
   layer. It delegates lookup to UserQueryPort and returns the domain
   model. This use case contains no transport or persistence details to
   remain portable and test-friendly.
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
