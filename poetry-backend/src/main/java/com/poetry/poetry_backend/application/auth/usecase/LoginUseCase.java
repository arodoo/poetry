/*
 File: LoginUseCase.java
 Purpose: Executes the login flow in the Application layer. It accepts
   raw credentials and delegates authentication and token issuance to the
   AuthPort. The class enforces separation of concerns by avoiding any
   transport or storage details, keeping the business rule portable.
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
