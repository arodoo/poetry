/*
 File: RefreshTokenUseCase.java
 Purpose: Handles token renewal in the Application layer. It receives a
   refresh token and delegates validation and new token creation to the
   AuthPort. The class is pure orchestration with no infrastructure
   concerns, supporting testability and portability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.auth.usecase;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.AuthPort;

public class RefreshTokenUseCase {
  private final AuthPort auth;

  public RefreshTokenUseCase(AuthPort auth) {
    this.auth = auth;
  }

  public Map<String, Object> execute(String refreshToken) {
    return auth.refresh(refreshToken);
  }
}
