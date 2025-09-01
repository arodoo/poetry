/*
 * File: ThemeValidator.java
 * Purpose: Validation utilities for Theme aggregate invariants.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

import java.util.Map;

final class ThemeValidator {
  private ThemeValidator() {}
  static void validate(String name, Map<String, String> colors) {
    if (name == null || name.isBlank() || name.length() > 50) {
      throw new IllegalArgumentException("theme.name.invalid");
    }
    if (colors == null || colors.isEmpty()) {
      throw new IllegalArgumentException("theme.colors.empty");
    }
    colors.forEach((k, v) -> {
      if (k == null || k.isBlank() || k.length() > 30) {
        throw new IllegalArgumentException("theme.color.key.invalid");
      }
      if (v == null || v.isBlank() || v.length() > 15) {
        throw new IllegalArgumentException("theme.color.value.invalid");
      }
      if (!v.startsWith("#")) {
        throw new IllegalArgumentException("theme.color.value.format");
      }
    });
  }
}
