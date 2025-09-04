/*
 * File: CustomizationSelectionQueryPort.java
 * Purpose: Port for querying current UI customization selection (system-level placeholder).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.port;

import java.util.Optional;

import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;

public interface CustomizationSelectionQueryPort {
  Optional<UiCustomizationSelection> getSystemSelection();
}
