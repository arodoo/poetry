/*
 * File: LoginUseCase.java
 * Purpose: Execute the login flow for users by validating credentials and
 * issuing authentication tokens or session artifacts. This use case coordinates
 * between domain validation, authentication ports and token management. It
 * keeps application logic decoupled from transport and persistence details
 * and encapsulates side-effects while returning application-level DTOs or
 * domain objects as required by calling controllers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.usecase.session;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.AuthPort;

public class LoginUseCase {
  private final AuthPort auth;

  public LoginUseCase(AuthPort auth) {
    this.auth = auth;
  }

  public Map<String, Object> execute(String username, String password) {
    return auth.login(username, password);
  }
}
