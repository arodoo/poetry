/*
 File: InMemoryAuthAdapter.java
 Purpose: Simplified in-memory implementation of AuthPort for testing
   and development. It returns mock tokens and performs no persistence
   or security checks. Replace with a secure adapter in production.
 All Rights Reserved. Arodi Emmanuel
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
