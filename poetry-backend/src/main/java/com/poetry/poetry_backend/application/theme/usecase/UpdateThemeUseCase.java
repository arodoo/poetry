/*
 * File: UpdateThemeUseCase.java
 * Purpose: Application use case for updating existing theme.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import java.util.Map;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.exception.ThemeNotFoundException;
import com.poetry.poetry_backend.domain.theme.model.Theme;

public class UpdateThemeUseCase {
  private final ThemeQueryPort query;
  private final ThemeCommandPort command;
  public UpdateThemeUseCase(ThemeQueryPort q, ThemeCommandPort c) {
    this.query = q; this.command = c; }
  public Theme execute(Long id, String name, Map<String, String> colors) {
    Theme current = query.findById(id).orElseThrow(() -> new ThemeNotFoundException(id));
    return command.save(current.withUpdated(name, colors));
  }
}
