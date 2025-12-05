/*
 * File: ResolveCurrentSelectionUseCase.java
 * Purpose: Determine current UI customization selection with layered fallback.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase.selection;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

/**
 * Contract:
 * Inputs: Lists of available token option DTOs (themes, fonts, etc.) plus access to
 *         stored selection and active theme use case.
 * Behavior:
 *   1. If a stored system selection exists and its theme still exists -> use it.
 *   2. If stored exists but theme removed -> substitute first available or "default".
 *   3. Else attempt active theme from domain.
 *   4. Else first theme key or literal fallback "default".
 * Outputs: {@link UiCustomizationSelection} representing resolved keys.
 * Errors: Never throws; swallows domain active theme exception and proceeds with fallback.
 */
public class ResolveCurrentSelectionUseCase {
  private final GetActiveThemeUseCase getActiveThemeUseCase;
  private final CustomizationSelectionQueryPort selectionQueryPort;

  public ResolveCurrentSelectionUseCase(GetActiveThemeUseCase getActiveThemeUseCase,
      CustomizationSelectionQueryPort selectionQueryPort) {
    this.getActiveThemeUseCase = getActiveThemeUseCase;
    this.selectionQueryPort = selectionQueryPort;
  }

  public UiCustomizationSelection execute(
      List<UITokensDto.Theme> themes,
      List<UITokensDto.Font> fonts,
      List<UITokensDto.FontSizeSet> fontSizes,
      List<UITokensDto.SpacingSet> spacings,
      List<UITokensDto.RadiusSet> radius,
      List<UITokensDto.ShadowSet> shadows) {
    Optional<UiCustomizationSelection> stored = selectionQueryPort.getSystemSelection();
    if (stored.isPresent()) {
      UiCustomizationSelection s = stored.get();
      boolean themeStillExists = themes.stream().anyMatch(t -> t.key.equals(s.themeKey()));
      if (!themeStillExists) {
        String fallbackTheme = ResolveCurrentSelectionHelpers.fallbackThemeKey(themes);
        return new UiCustomizationSelection(fallbackTheme, s.fontKey(), s.fontSizeKey(),
            s.spacingKey(), s.radiusKey(), s.shadowKey());
      }
      return s;
    }
    String themeKey = ResolveCurrentSelectionHelpers.resolveThemeKey(getActiveThemeUseCase, themes);
  // Prefer explicit preloadDefault font if provided; else first; else fallback literal.
  String fontKey = fonts.stream()
    .filter(f -> f.preloadDefault)
    .findFirst()
    .map(f -> f.key)
    .orElse(ResolveCurrentSelectionHelpers.first(fonts, f -> f.key, "Inter"));
  return new UiCustomizationSelection(
    themeKey,
    fontKey,
      ResolveCurrentSelectionHelpers.first(fontSizes, f -> f.key, "default"),
      ResolveCurrentSelectionHelpers.first(spacings, s -> s.key, "default"),
      ResolveCurrentSelectionHelpers.first(radius, r -> r.key, "default"),
      ResolveCurrentSelectionHelpers.first(shadows, s -> s.key, "default"));
  }
}
