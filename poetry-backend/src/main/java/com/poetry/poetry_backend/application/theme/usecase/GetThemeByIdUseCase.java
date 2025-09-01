/*
 * File: GetThemeByIdUseCase.java
 * Purpose: Application use case retrieving a theme by identifier.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;

public class GetThemeByIdUseCase {
  private final ThemeQueryPort query;
  public GetThemeByIdUseCase(ThemeQueryPort q) { this.query = q; }
  public Theme execute(Long id) { return query.findById(id).orElseThrow(); }
}
