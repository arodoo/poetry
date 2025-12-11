/*
 * File: UserValidator.java
 * Purpose: Centralize validation rules for the User aggregate ensuring
 * consistent constraints on profile, username, email and roles across
 * creation and mutation flows. Keeping validation here keeps the record lean
 * while preserving domain logic within the user package.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model.core;

import java.util.Set;
import java.util.stream.Collectors;

public final class UserValidator {
  private UserValidator() {
  }

  public static String requireName(String label, String value) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException(label + ".blank");
    }
    return value.trim();
  }

  public static String requireEmail(String value) {
    if (value == null || value.isBlank() || !value.contains("@") || !value.contains(".")) {
      throw new IllegalArgumentException("email.invalid");
    }
    return value.trim();
  }

  public static String requireUsername(String value) {
    return requireName("username", value);
  }

  public static String requireLocale(String value) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException("locale.blank");
    }
    return value.trim();
  }

  public static Set<String> requireRoles(Set<String> roles) {
    Set<String> sanitized = roles == null
        ? Set.of()
        : roles.stream().map(String::trim).filter(v -> !v.isEmpty()).collect(Collectors.toSet());
    if (sanitized.isEmpty()) {
      throw new IllegalArgumentException("roles.empty");
    }
    return Set.copyOf(sanitized);
  }

  public static String requirePasswordHash(String value) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException("password.hash.blank");
    }
    return value;
  }
}
