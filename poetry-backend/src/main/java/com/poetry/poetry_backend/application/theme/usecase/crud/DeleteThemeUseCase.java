/*
 * File: DeleteThemeUseCase.java
 * Purpose: Application use case performing soft delete on theme.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase.crud;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;

public class DeleteThemeUseCase {
  private final ThemeCommandPort command;
  public DeleteThemeUseCase(ThemeCommandPort c) { this.command = c; }
  public void execute(Long id) { command.deleteSoft(id); }
}
