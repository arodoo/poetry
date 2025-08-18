/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
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
