/*
 * File: GetActiveThemeUseCase.java
 * Purpose: Application use case retrieving the active theme.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase.crud;

import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.exception.ThemeNotFoundException;
import com.poetry.poetry_backend.domain.theme.model.Theme;

public class GetActiveThemeUseCase {
  private final ThemeQueryPort query;
  public GetActiveThemeUseCase(ThemeQueryPort q) { this.query = q; }
  public Theme execute() {
    return query.findActive().orElseThrow(() -> new ThemeNotFoundException(0L));
  }
}
