/*
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

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
