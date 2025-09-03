/*
 * File: CreateThemeUseCase.java
 * Purpose: Application use case for creating a new theme aggregate.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import java.util.Map;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;

public class CreateThemeUseCase {
  private final ThemeCommandPort command;
  public CreateThemeUseCase(ThemeCommandPort c) { this.command = c; }
  public Theme execute(String key, String name, Map<String, String> colors) {
    return command.save(Theme.createNew(key, name, colors));
  }
}
