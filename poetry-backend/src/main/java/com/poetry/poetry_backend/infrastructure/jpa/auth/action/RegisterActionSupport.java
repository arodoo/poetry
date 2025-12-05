/*
 * File: RegisterActionSupport.java
 * Purpose: Provides input validation and hashing helpers for
 * RegisterAction to keep orchestration file concise. Centralizes
 * lightweight logic (validation, simple hashing). All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.action;

import com.poetry.poetry_backend.application.auth.port.PasswordPolicyPort;

final class RegisterActionSupport {
  void validateInputs(
      String username, String email, String password, PasswordPolicyPort passwordPolicy) {
    if (username == null || username.isBlank()) {
      throw new IllegalArgumentException("username");
    }
    if (email == null || email.isBlank()) {
      throw new IllegalArgumentException("email");
    }
    if (password == null) {
      throw new IllegalArgumentException("password");
    }
    passwordPolicy.validate(password, username, email);
  }

  String hash(String input) { // Simple stable hash used only for idem replay key.
    return Integer.toHexString(input.hashCode());
  }
}
