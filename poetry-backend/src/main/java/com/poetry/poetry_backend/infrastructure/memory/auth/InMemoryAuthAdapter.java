/*
 * File: InMemoryAuthAdapter.java
 * Purpose: In-memory implementation of authentication adapter used for
 * testing and local development. This adapter provides simple auth
 * operations without external dependencies and is intended for fast
 * iterations and CI tests. It centralizes transient authentication
 * behavior and keeps production adapters decoupled.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.AuthPort;

public class InMemoryAuthAdapter implements AuthPort {
  public Map<String, Object> login(String u, String p) {
    return Map.of("token", "fake-jwt", "username", u);
  }

  public Map<String, Object> refresh(String t) {
    return Map.of("token", "fake-jwt-refreshed");
  }

  public void logout(String t) {
    /* no-op */ }

  public Map<String, Object> register(Map<String, Object> user) {
    return user;
  }
}
