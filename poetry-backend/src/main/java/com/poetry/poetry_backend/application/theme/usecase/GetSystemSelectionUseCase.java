/*
 * File: GetSystemSelectionUseCase.java
 * Purpose: Use case returning stored system customization selection if present.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import java.util.Optional;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;

public class GetSystemSelectionUseCase {
  private final CustomizationSelectionQueryPort query;
  public GetSystemSelectionUseCase(CustomizationSelectionQueryPort query) { this.query = query; }
  public Optional<UiCustomizationSelection> execute() { return query.getSystemSelection(); }
}
