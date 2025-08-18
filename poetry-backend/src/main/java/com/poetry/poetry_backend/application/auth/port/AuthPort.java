/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
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
