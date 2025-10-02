/*
 * File: UserValidator.java
 * Purpose: Centralize validation rules for the User aggregate ensuring
 * consistent constraints on profile, username, email and roles across
 * creation and mutation flows. Keeping validation here keeps the record lean
 * while preserving domain logic within the user package.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

import java.util.Set;
import java.util.stream.Collectors;

final class UserValidator {
  private UserValidator() { }

  static String requireName(String label, String value) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException(label + " must not be blank");
    }
    return value.trim();
  }

  static String requireEmail(String value) {
    if (value == null || value.isBlank() || !value.contains("@") || !value.contains(".")) {
      throw new IllegalArgumentException("email must be provided and valid");
    }
    return value.trim();
  }

  static String requireUsername(String value) {
    return requireName("username", value);
  }

  static String requireLocale(String value) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException("locale must not be blank");
    }
    return value.trim();
  }

  static Set<String> requireRoles(Set<String> roles) {
    Set<String> sanitized = roles == null
        ? Set.of()
        : roles.stream().map(String::trim).filter(v -> !v.isEmpty()).collect(Collectors.toSet());
    if (sanitized.isEmpty()) {
      throw new IllegalArgumentException("At least one role must be assigned");
    }
    return Set.copyOf(sanitized);
  }

  static String requirePasswordHash(String value) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException("password hash must not be blank");
    }
    return value;
  }
}
