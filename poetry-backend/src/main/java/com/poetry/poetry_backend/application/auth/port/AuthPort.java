/*
 File: ${file}
 Purpose: This header template must be replaced per file with a
   detailed, file-specific description (at least 3 sentences) that
   explains the class/module responsibilities, key operations, and how
   it interacts with collaborators. Keep lines ≤80 chars.
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
