/*
 * File: GetAllFontsUseCase.java
 * Purpose: Use case to list all font assets.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

public class GetAllFontsUseCase {
  private final FontQueryPort query;
  public GetAllFontsUseCase(FontQueryPort query) { this.query = query; }
  public List<FontAsset> execute() { return query.findAll(); }
}
