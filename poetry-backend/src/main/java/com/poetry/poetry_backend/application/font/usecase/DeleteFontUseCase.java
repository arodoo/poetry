/*
 * File: DeleteFontUseCase.java
 * Purpose: Soft delete a font asset.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;

public class DeleteFontUseCase {
  private final FontCommandPort command;
  public DeleteFontUseCase(FontCommandPort command) { this.command = command; }
  public void execute(Long id) { command.deleteSoft(id); }
}
