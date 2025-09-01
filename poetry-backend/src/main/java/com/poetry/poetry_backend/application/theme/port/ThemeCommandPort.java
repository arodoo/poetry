/*
 * File: ThemeCommandPort.java
 * Purpose: Application port for mutating theme aggregate state.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.port;

import com.poetry.poetry_backend.domain.theme.model.Theme;

public interface ThemeCommandPort {
  Theme save(Theme theme);
  void deleteSoft(Long id);
  void restore(Long id);
  void deactivateAll();
  long count();
}
