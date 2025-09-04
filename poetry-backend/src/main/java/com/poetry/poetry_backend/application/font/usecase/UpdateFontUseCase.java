/*
 * File: UpdateFontUseCase.java
 * Purpose: Use case to update a font asset (simplified; replaces record entirely).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

public class UpdateFontUseCase {
  private final FontCommandPort command;
  public UpdateFontUseCase(FontCommandPort command) { this.command = command; }
  public FontAsset execute(
    FontAsset existing,
    String label,
    String url,
    List<Integer> weights,
    boolean preload,
    boolean active,
    String integrity
  ) {
    FontAsset updated = new FontAsset(
      existing.id(),
      existing.key(),
      label,
      url,
      weights,
      existing.hash(),
      preload,
      active,
      integrity
    );
    return command.save(updated);
  }
}
