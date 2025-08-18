/*
 File: RegisterUseCase.java
 Purpose: Coordinates user registration in the Application layer. It
   forwards validated input to AuthPort for account creation and token
   issuance. The use case models a single unit of behavior and remains
   independent of HTTP, persistence, and frameworks.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.auth.usecase;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.AuthPort;

public class RegisterUseCase {
  private final AuthPort auth;

  public RegisterUseCase(AuthPort auth) {
    this.auth = auth;
  }

  public Map<String, Object> execute(Map<String, Object> payload) {
    return auth.register(payload);
  }
}
