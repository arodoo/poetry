/*
 * File: CreateFontUseCase.java
 * Purpose: Use case to create a font asset.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

public class CreateFontUseCase {
  private final FontCommandPort command;
  public CreateFontUseCase(FontCommandPort command) { this.command = command; }
  public FontAsset execute(
    String key,
    String label,
    String url,
    List<Integer> weights,
    String hash,
    boolean preload,
    String integrity
  ) {
    return command.save(
      FontAsset.createNew(
        key,
        label,
        url,
        weights,
        hash,
        preload,
        integrity
      )
    );
  }
}
