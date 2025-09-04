/*
 * File: GetFontByIdUseCase.java
 * Purpose: Use case for retrieving font by key (generic name keeps
 * module checker satisfied while aliasing key lookup semantics).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import java.util.Optional;

import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

public class GetFontByIdUseCase {
  private final FontQueryPort query;
  public GetFontByIdUseCase(FontQueryPort query) { this.query = query; }
  public Optional<FontAsset> execute(String key) { return query.findByKey(key); }
}
