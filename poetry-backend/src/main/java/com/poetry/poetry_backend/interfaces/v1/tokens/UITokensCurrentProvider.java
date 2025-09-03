/*
 * File: UITokensCurrentProvider.java
 * Purpose: Component resolving current UI token selections dynamically.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.theme.usecase.GetActiveThemeUseCase;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;


@Component
public class UITokensCurrentProvider {
  private final GetActiveThemeUseCase getActiveThemeUseCase;

  public UITokensCurrentProvider(GetActiveThemeUseCase getActiveThemeUseCase) {
    this.getActiveThemeUseCase = getActiveThemeUseCase;
  }

  public UITokensDto.Current getCurrent(List<UITokensDto.Theme> themes,
      List<UITokensDto.Font> fonts,
      List<UITokensDto.FontSizeSet> fontSizes,
      List<UITokensDto.SpacingSet> spacings,
      List<UITokensDto.RadiusSet> radius,
      List<UITokensDto.ShadowSet> shadows) {
    String themeKey;
    try {
      themeKey = getActiveThemeUseCase.execute().getKey();
    } catch (Exception ex) {
      themeKey = getFallbackThemeKey(themes);
    }
    UiCustomizationSelection sel = new UiCustomizationSelection(
        themeKey,
        first(fonts, f -> f.key, "Inter"),
        first(fontSizes, f -> f.key, "default"),
        first(spacings, s -> s.key, "default"),
        first(radius, r -> r.key, "default"),
        first(shadows, s -> s.key, "default"));
    UITokensDto.Current dto = new UITokensDto.Current();
    dto.theme = sel.themeKey();
    dto.font = sel.fontKey();
    dto.fontSize = sel.fontSizeKey();
    dto.spacing = sel.spacingKey();
    dto.radius = sel.radiusKey();
    dto.shadow = sel.shadowKey();
    return dto;
  }

  private <T> String first(
      List<T> list,
      java.util.function.Function<T, String> f,
      String fallback) {
    return list.stream()
        .findFirst()
        .map(f)
        .orElse(fallback);
  }

  private String getFallbackThemeKey(List<UITokensDto.Theme> themes) {
    return themes.stream().findFirst().map(t -> t.key).orElse("default");
  }
}
