/*
 * File: ThemeNotFoundException.java
 * Purpose: Domain-specific exception for missing Theme aggregates.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.exception;

import com.poetry.poetry_backend.domain.shared.exception.AbstractNotFoundException;

public class ThemeNotFoundException extends AbstractNotFoundException {
  public ThemeNotFoundException(Long id) {
    super("theme", String.valueOf(id), "Theme not found: " + id);
  }
}
