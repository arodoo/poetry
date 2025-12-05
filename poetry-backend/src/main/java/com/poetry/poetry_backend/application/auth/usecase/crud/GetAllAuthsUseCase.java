/*
 * File: GetAllAuthsUseCase.java
 * Purpose: Retrieves all Auth aggregates via query port.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase.crud;

import java.util.List;

import com.poetry.poetry_backend.application.auth.port.AuthQueryPort;
import com.poetry.poetry_backend.domain.auth.model.Auth;

public class GetAllAuthsUseCase {
  private final AuthQueryPort queryPort;

  public GetAllAuthsUseCase(AuthQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public List<Auth> execute() {
    return queryPort.findAll();
  }
}
