/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.port;

/**
 * File: AuthPort.java
 * Purpose: Application-level authentication port with operations for
 * login, token refresh, logout, and registration. This abstraction decouples
 * use cases from infrastructure and enables testing via mocks.
 * All Rights Reserved. Arodi Emmanuel
 */

import java.util.Map;

public interface AuthPort {
  Map<String, Object> login(String username, String password);

  Map<String, Object> refresh(String refreshToken);

  void logout(String refreshToken);

  Map<String, Object> register(Map<String, Object> userPayload);
}
