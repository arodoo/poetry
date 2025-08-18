/*
 File: ${file}
 Purpose: This header template must be replaced per file with a
   detailed, file-specific description (at least 3 sentences) that
   explains the class/module responsibilities, key operations, and how
   it interacts with collaborators. Keep lines ≤80 chars.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.auth.usecase;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.AuthPort;

public class LoginUseCase {
  private final AuthPort auth;

  public LoginUseCase(AuthPort auth) {
    this.auth = auth;
  }

  public Map<String, Object> execute(String username, String password) {
    return auth.login(username, password);
  }
}
