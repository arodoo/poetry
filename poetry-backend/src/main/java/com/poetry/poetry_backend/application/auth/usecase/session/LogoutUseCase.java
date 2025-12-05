/*
 * File: LogoutUseCase.java
 * Purpose: Handle user logout operations, including revoking tokens or
 * invalidating sessions managed by authentication adapters. This use case
 * keeps authentication state changes isolated from controllers and
 * infrastructure. It provides a single responsibility implementation that can
 * be reused and tested in isolation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.usecase.session;

import com.poetry.poetry_backend.application.auth.port.AuthPort;

public class LogoutUseCase {
  private final AuthPort auth;

  public LogoutUseCase(AuthPort auth) {
    this.auth = auth;
  }

  public void execute(String refreshToken) {
    auth.logout(refreshToken);
  }
}
