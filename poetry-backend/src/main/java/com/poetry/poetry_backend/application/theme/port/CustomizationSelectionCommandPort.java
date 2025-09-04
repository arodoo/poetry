/*
 * File: CustomizationSelectionCommandPort.java
 * Purpose: Port for persisting UI customization selection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.port;

import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;

public interface CustomizationSelectionCommandPort {
  UiCustomizationSelection saveSystemSelection(UiCustomizationSelection selection);
}
