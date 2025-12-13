/*
 * File: UITokensCurrentSelectionTest.java
 * Purpose: Validate current selection resolves first theme key fallback.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensCurrentProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensDataProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensRadiusProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensShadowsProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensSpacingsProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontFamiliesProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontSizesProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontWeightsProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontsProvider;

class UITokensCurrentSelectionTest {
  @Test
  void fallbackThemeKeyUsedWhenNoActive() {
    ThemesProviderPort themesProvider = () -> {
      UITokensDto.Theme a = new UITokensDto.Theme();
      a.key = "alpha";
      a.label = "Alpha";
      a.colors = Map.of("c", "#fff");
      UITokensDto.Theme b = new UITokensDto.Theme();
      b.key = "beta";
      b.label = "Beta";
      b.colors = Map.of("c", "#000");
      return List.of(a, b);
    };
    GetActiveThemeUseCase active = new GetActiveThemeUseCase(
        new com.poetry.poetry_backend.application.theme.port.ThemeQueryPort() {
          @Override
          public java.util.List<Theme> findAll() {
            return java.util.List.of();
          }

          @Override
          public java.util.Optional<Theme> findById(Long id) {
            return java.util.Optional.empty();
          }

          @Override
          public java.util.Optional<Theme> findByKey(String key) {
            return java.util.Optional.empty();
          }

          @Override
          public java.util.Optional<Theme> findActive() {
            return java.util.Optional.empty();
          }
        });
    CustomizationSelectionQueryPort selectionQuery = java.util.Optional::<UiCustomizationSelection>empty;
    var resolve = new ResolveCurrentSelectionUseCase(active, selectionQuery);
    var dataProvider = new UITokensDataProvider(
        themesProvider,
        new UITokensFontsProvider(),
        new UITokensFontFamiliesProvider(),
        new UITokensFontSizesProvider(),
        new UITokensFontWeightsProvider(),
        new UITokensSpacingsProvider(),
        new UITokensRadiusProvider(),
        new UITokensShadowsProvider(),
        new UITokensCurrentProvider(resolve));
    UITokensDto dto = dataProvider.getTokens();
    assertEquals("alpha", dto.current.theme);
  }
}
