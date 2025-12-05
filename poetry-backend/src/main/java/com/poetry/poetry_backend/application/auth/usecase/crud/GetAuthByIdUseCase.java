/*
 * File: GetAuthByIdUseCase.java
 * Purpose: Retrieves an Auth by id or throws not found.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase.crud;

import com.poetry.poetry_backend.application.auth.port.AuthQueryPort;
import com.poetry.poetry_backend.domain.auth.exception.AuthNotFoundException;
import com.poetry.poetry_backend.domain.auth.model.Auth;

public class GetAuthByIdUseCase {
  private final AuthQueryPort queryPort;

  public GetAuthByIdUseCase(AuthQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public Auth execute(String id) {
    return queryPort.findById(id)
        .orElseThrow(() -> new AuthNotFoundException(id));
  }
}
