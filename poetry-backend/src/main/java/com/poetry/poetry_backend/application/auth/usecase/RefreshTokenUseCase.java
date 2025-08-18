/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
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
