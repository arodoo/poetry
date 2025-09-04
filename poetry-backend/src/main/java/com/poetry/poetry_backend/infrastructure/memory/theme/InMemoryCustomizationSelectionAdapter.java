/*
 * File: InMemoryCustomizationSelectionAdapter.java
 * Purpose: In-memory adapter for customization selection ports (system scope placeholder).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.theme;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionCommandPort;
import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;

@Component
public class InMemoryCustomizationSelectionAdapter implements
    CustomizationSelectionQueryPort, CustomizationSelectionCommandPort {
  private final AtomicReference<UiCustomizationSelection> ref = new AtomicReference<>();

  @Override
  public Optional<UiCustomizationSelection> getSystemSelection() {
    return Optional.ofNullable(ref.get());
  }

  @Override
  public UiCustomizationSelection saveSystemSelection(
      UiCustomizationSelection selection) {
    ref.set(selection);
    return selection;
  }
}
