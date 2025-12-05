/*
 * File: ActivateThemeUseCase.java
 * Purpose: Ensures single active theme by deactivating others then
 * activating selected theme.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase.crud;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.exception.ThemeNotFoundException;
import com.poetry.poetry_backend.domain.theme.model.Theme;

public class ActivateThemeUseCase {
  private final ThemeQueryPort query; private final ThemeCommandPort command;
  public ActivateThemeUseCase(ThemeQueryPort q, ThemeCommandPort c) {
    this.query = q; this.command = c; }
  public Theme execute(Long id) {
    command.deactivateAll();
    Theme t = query.findById(id).orElseThrow(() -> new ThemeNotFoundException(id));
    return command.save(t.withActivated(true));
  }
}
