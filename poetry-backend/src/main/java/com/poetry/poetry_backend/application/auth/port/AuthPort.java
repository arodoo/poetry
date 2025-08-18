/*
 File: AuthPort.java
 Purpose: Defines the authentication boundary for the Application layer.
   Implementations provide credential verification, token lifecycle
   management, and user registration. Adapters in Infrastructure must
   honor these contracts, enabling tests to mock this port easily.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.auth.port;

import java.util.Map;

public interface AuthPort {
  Map<String, Object> login(String username, String password);

  Map<String, Object> refresh(String refreshToken);

  void logout(String refreshToken);

  Map<String, Object> register(Map<String, Object> userPayload);
}
