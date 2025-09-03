/*
 * File: ThemeValidator.java
 * Purpose: Validation utilities for Theme aggregate invariants (key, name, colors).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

import java.util.Map;
import java.util.regex.Pattern;

final class ThemeValidator {
  private static final int MAX_COLOR_VALUE_LENGTH = 40;
  private static final Pattern COLOR_PATTERN = Pattern.compile(
      "^(#([0-9a-fA-F]{3,8}))$|^(hsl\\(.*\\))$|^(var\\(.*\\))$");
  private static final Pattern KEY_PATTERN = Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)*$");
  private ThemeValidator() { }
  static void validate(String key, String name, Map<String, String> colors) {
    if (key == null || key.isBlank() || key.length() > 40 || !KEY_PATTERN.matcher(key).matches()) {
      throw new IllegalArgumentException("theme.key.invalid");
    }
    if (name == null || name.isBlank() || name.length() > 50) {
      throw new IllegalArgumentException("theme.name.invalid");
    }
    if (colors == null || colors.isEmpty()) {
      throw new IllegalArgumentException("theme.colors.empty");
    }
    colors.forEach((colorName, value) -> {
      if (colorName == null || colorName.isBlank() || colorName.length() > 30) {
        throw new IllegalArgumentException("theme.color.key.invalid");
      }
      if (value == null || value.isBlank() || value.length() > MAX_COLOR_VALUE_LENGTH) {
        throw new IllegalArgumentException("theme.color.value.invalid");
      }
      if (!COLOR_PATTERN.matcher(value).matches()) {
        throw new IllegalArgumentException("theme.color.value.format");
      }
    });
  }
}
