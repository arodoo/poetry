/*
 * File: SimplePasswordHasher.java
 * Purpose: Trivial password hasher implementation for development and
 * tests. Uses a reversible prefix scheme and MUST be replaced for real
 * deployments. Exists to satisfy PasswordHasherPort without adding
 * external dependencies at this stage.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.auth;

import com.poetry.poetry_backend.application.auth.port.PasswordHasherPort;

public class SimplePasswordHasher implements PasswordHasherPort {
  public String hash(String rawPassword) { return "h$" + rawPassword; }
  public boolean matches(String rawPassword, String hashedPassword) {
    return hashedPassword.equals(hash(rawPassword));
  }
}
