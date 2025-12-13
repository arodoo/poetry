/*
 * File: UITokensPreloadDefaultFontSelectionBehaviorTest.java
 * Purpose: Verifies preloadDefault font is selected when no stored selection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensCurrentProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensDataProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensRadiusProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensShadowsProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensSpacingsProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontFamiliesProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontSizesProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontWeightsProvider;

class UITokensPreloadDefaultFontSelectionBehaviorTest
  extends UITokensPreloadDefaultFontProviderTest {
  @Test
  void preloadDefaultFontPreferred() {
    var themesProvider = singleTheme();
  var fontsProvider = new com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontsProviderPort() {
      @Override
      public List<UITokensDto.Font> getFonts() {
        return List.of(
          font("roboto", "Roboto", "roboto.woff2", "h1", false),
          font("inter", "Inter", "inter.woff2", "h2", true)
        );
      }
    };
    GetActiveThemeUseCase active = new GetActiveThemeUseCase(
      new com.poetry.poetry_backend.application.theme.port.ThemeQueryPort() {
        @Override
        public java.util.List<Theme> findAll() { return java.util.List.of(); }
        @Override
        public java.util.Optional<Theme> findById(Long id) { return java.util.Optional.empty(); }
      public java.util.Optional<Theme> findByKey(String key) { return java.util.Optional.empty(); }
        @Override
        public java.util.Optional<Theme> findActive() { return java.util.Optional.empty(); }
      }
    );
    CustomizationSelectionQueryPort selectionQuery =
      java.util.Optional::<UiCustomizationSelection>empty;
    var resolve = new ResolveCurrentSelectionUseCase(active, selectionQuery);
    var dataProvider = new UITokensDataProvider(
      themesProvider,
      fontsProvider,
      new UITokensFontFamiliesProvider(),
      new UITokensFontSizesProvider(),
      new UITokensFontWeightsProvider(),
      new UITokensSpacingsProvider(),
      new UITokensRadiusProvider(),
      new UITokensShadowsProvider(),
      new UITokensCurrentProvider(resolve));
    UITokensDto dto = dataProvider.getTokens();
    assertEquals("inter", dto.current.font, "Expected preloadDefault font to be chosen");
  }
}
