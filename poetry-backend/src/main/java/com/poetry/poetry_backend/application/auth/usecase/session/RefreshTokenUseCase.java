/*
 * File: RefreshTokenUseCase.java
 * Purpose: Refresh authentication tokens using a valid refresh token and
 * create fresh access tokens while enforcing security checks and rotation
 * policies. This use case abstracts token refresh mechanics away from
 * controllers and relies on authentication ports to perform token issuance.
 * It centralizes refresh behavior for testability and consistency.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.usecase.session;

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
