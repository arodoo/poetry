/*
 * File: SaveSystemSelectionUseCase.java
 * Purpose: Use case persisting system customization selection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import com.poetry.poetry_backend.application.theme.port.*;
import com.poetry.poetry_backend.domain.theme.model.*;

public class SaveSystemSelectionUseCase {
  private final CustomizationSelectionCommandPort command;

  public SaveSystemSelectionUseCase(
      CustomizationSelectionCommandPort command) {
    this.command = command;
  }

  public UiCustomizationSelection execute(
      UiCustomizationSelection sel) {
    return command.saveSystemSelection(sel);
  }
}
