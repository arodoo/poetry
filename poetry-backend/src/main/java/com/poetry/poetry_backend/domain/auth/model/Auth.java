/*
 * File: Auth.java
 * Purpose: Domain aggregate for Auth feature with basic validation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.auth.model;

public record Auth(String id, String username, boolean deleted) {
  public Auth {
    if (id == null || id.isBlank()) {
      throw new IllegalArgumentException("auth.id.blank");
    }
    if (username == null || username.isBlank()) {
      throw new IllegalArgumentException("auth.username.blank");
    }
  }
}
