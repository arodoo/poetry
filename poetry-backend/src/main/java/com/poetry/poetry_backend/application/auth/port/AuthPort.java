/*
 * File: AuthPort.java
 * Purpose: Defines the authentication-related ports used by the application
 * layer to authenticate users, refresh tokens, and manage authentication
 * state. This interface abstracts authentication operations so application
 * services and use-cases can depend on a stable contract rather than
 * concrete implementations. Implementations are provided in the
 * infrastructure layer and must preserve the method signatures defined here.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.port;

import java.util.Map;

public interface AuthPort {
  Map<String, Object> login(String username, String password);

  Map<String, Object> refresh(String refreshToken);

  void logout(String refreshToken);

  Map<String, Object> register(Map<String, Object> userPayload);
}
