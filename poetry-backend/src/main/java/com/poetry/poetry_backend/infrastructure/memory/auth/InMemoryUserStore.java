/*
 * File: InMemoryUserStore.java
 * Purpose: Manages in-memory user storage and validation for auth adapter.
 * Handles user creation, duplicate checking, password validation and
 * temporary credential storage for testing and development environments.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.poetry.poetry_backend.application.auth.exception.DuplicateUserException;
import com.poetry.poetry_backend.application.auth.port.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.PasswordHasherPort;

class InMemoryUserStore {
  private final PasswordHasherPort hasher;
  private final AuditLoggerPort audit;
  private final Map<String, String> users = new ConcurrentHashMap<>();

  InMemoryUserStore(PasswordHasherPort hasher, AuditLoggerPort audit) {
    this.hasher = hasher;
    this.audit = audit;
    users.put("john", hasher.hash("doe"));
  }

  boolean validateCredentials(String username, String password) {
    String hashed = users.get(username);
    return hashed != null && hasher.matches(password, hashed);
  }

  void registerUser(String username, String password) {
    if (users.containsKey(username)) {
      audit.record("register.fail", username, "duplicate");
      throw new DuplicateUserException("auth.user.duplicate");
    }
    users.put(username, hasher.hash(password));
    audit.record("register", username, "created");
  }
}
