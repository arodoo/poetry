/*
 * File: GetAllThemesUseCase.java
 * Purpose: Application use case retrieving all non-deleted themes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;

public class GetAllThemesUseCase {
  private final ThemeQueryPort query;
  public GetAllThemesUseCase(ThemeQueryPort q) { this.query = q; }
  public List<Theme> execute() { return query.findAll(); }
}
