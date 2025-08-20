/*
 * All Rights Reserved. Arodi Emmanuel
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
