/*
 File: LogoutUseCase.java
 Purpose: Orchestrates user logout in the Application layer. It delegates
   token revocation to the AuthPort, ensuring the refresh token is
   invalidated and subsequent use is rejected. This use case contains no
   HTTP or persistence logic and is framework-agnostic by design.
 All Rights Reserved. Arodi Emmanuel
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
