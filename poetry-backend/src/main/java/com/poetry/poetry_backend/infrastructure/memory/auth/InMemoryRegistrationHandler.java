/*
 * File: InMemoryRegistrationHandler.java
 * Purpose: Handles user registration logic for in-memory auth adapter
 * including idempotency checks, validation, and user creation delegation.
 * Keeps registration flow isolated for testing and development environments.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.util.Map;

class InMemoryRegistrationHandler {
  private final InMemoryUserStore userStore;
  private final InMemoryIdempotencyStore idempotencyStore;

  InMemoryRegistrationHandler(
      InMemoryUserStore userStore, InMemoryIdempotencyStore idempotencyStore) {
    this.userStore = userStore;
    this.idempotencyStore = idempotencyStore;
  }

  Map<String, Object> register(Map<String, Object> user, String key) {
    var existing = idempotencyStore.getExisting(key);
    if (existing != null) {
      return existing;
    }
    String username = (String) user.get("username");
    if (username == null || username.isBlank()) {
      throw new IllegalArgumentException("auth.register.username.required");
    }
    String password = (String) user.getOrDefault("password", "temp");
    userStore.registerUser(username, password);
    idempotencyStore.store(key, user);
    return user;
  }
}
