/*
 * File: UiCustomizationSelection.java
 * Purpose: Value object for current UI customization selections.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

public record UiCustomizationSelection(
    String themeKey,
    String fontKey,
    String fontSizeKey,
    String spacingKey,
    String radiusKey,
    String shadowKey) {
  public UiCustomizationSelection {
    if (themeKey == null || themeKey.isBlank()) {
      throw new IllegalArgumentException("selection.theme.missing");
    }
    if (fontKey == null || fontKey.isBlank()) {
      throw new IllegalArgumentException("selection.font.missing");
    }
    if (fontSizeKey == null || fontSizeKey.isBlank()) {
      throw new IllegalArgumentException("selection.fontSize.missing");
    }
    if (spacingKey == null || spacingKey.isBlank()) {
      throw new IllegalArgumentException("selection.spacing.missing");
    }
    if (radiusKey == null || radiusKey.isBlank()) {
      throw new IllegalArgumentException("selection.radius.missing");
    }
    if (shadowKey == null || shadowKey.isBlank()) {
      throw new IllegalArgumentException("selection.shadow.missing");
    }
  }
}
