/*
 * File: UITokensCurrentProvider.java
 * Purpose: Component resolving current UI token selections dynamically.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import java.util.List;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.theme.usecase.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

@Component
public class UITokensCurrentProvider {
  private final ResolveCurrentSelectionUseCase resolveCurrentSelectionUseCase;

  public UITokensCurrentProvider(ResolveCurrentSelectionUseCase resolveCurrentSelectionUseCase) {
    this.resolveCurrentSelectionUseCase = resolveCurrentSelectionUseCase;
  }

  public UITokensDto.Current getCurrent(List<UITokensDto.Theme> themes,
      List<UITokensDto.Font> fonts,
      List<UITokensDto.FontSizeSet> fontSizes,
      List<UITokensDto.SpacingSet> spacings,
      List<UITokensDto.RadiusSet> radius,
      List<UITokensDto.ShadowSet> shadows) {
    // 1. Try stored selection
    UiCustomizationSelection sel = resolveCurrentSelectionUseCase.execute(
        themes, fonts, fontSizes, spacings, radius, shadows);
    UITokensDto.Current dto = new UITokensDto.Current();
    dto.theme = sel.themeKey();
    dto.font = sel.fontKey();
    dto.fontSize = sel.fontSizeKey();
    dto.spacing = sel.spacingKey();
    dto.radius = sel.radiusKey();
    dto.shadow = sel.shadowKey();
    return dto;
  }
}
