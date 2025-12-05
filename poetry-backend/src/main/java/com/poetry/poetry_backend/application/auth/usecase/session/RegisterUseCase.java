/*
 * File: RegisterUseCase.java
 * Purpose: Orchestrate new user registration including validation, user
 * creation and any post-registration side-effects required by the
 * application. The use case depends on user command ports and domain model
 * factories to ensure registrations conform to business rules and remain
 * testable in isolation from external systems. Extended with idempotent
 * variant using optional idempotency key.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.usecase.session;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.AuthPort;

public class RegisterUseCase {
  private final AuthPort auth;

  public RegisterUseCase(AuthPort auth) { this.auth = auth; }

  public Map<String, Object> execute(Map<String, Object> payload) {
    return auth.register(payload);
  }

  public Map<String, Object> execute(Map<String, Object> payload, String idempotencyKey) {
    return auth.register(payload, idempotencyKey);
  }
}
