/*
 * File: UITokensPreloadDefaultFontSelectionPreferredTest.java
 * Purpose: Verify preloadDefault font is chosen when no stored selection exists.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontsProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;

class UITokensPreloadDefaultFontSelectionPreferredTest {
  @Test
  void preloadDefaultFontIsPreferred() {
    ThemesProviderPort themesProvider = () -> List.of(theme("alpha", "Alpha"));
    FontsProviderPort fontsProvider = () -> List.of(
      font("roboto", "Roboto", "roboto.woff2", "h1", false),
      font("inter", "Inter", "inter.woff2", "h2", true)
    );
    GetActiveThemeUseCase active = new GetActiveThemeUseCase(
      new com.poetry.poetry_backend.application.theme.port.ThemeQueryPort() {
        @Override public List<Theme> findAll() { return List.of(); }
        @Override public Optional<Theme> findById(Long id) { return Optional.empty(); }
        @Override public Optional<Theme> findActive() { return Optional.empty(); }
      }
    );
    CustomizationSelectionQueryPort selectionQuery = Optional::<UiCustomizationSelection>empty;
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
      new UITokensCurrentProvider(resolve)
    );
    assertEquals("inter", dataProvider.getTokens().current.font, "preloadDefault chosen");
  }

  private UITokensDto.Theme theme(String key, String label) {
    UITokensDto.Theme t = new UITokensDto.Theme();
    t.key = key; t.label = label; t.colors = Map.of("c", "#fff");
    return t;
  }

  private UITokensDto.Font font(
    String key,
    String label,
    String url,
    String hash,
    boolean preload
  ) {
    UITokensDto.Font f = new UITokensDto.Font();
    f.key = key;
    f.label = label;
    f.woff2Url = url;
    f.hash = hash;
    f.weights = List.of(400);
    f.preloadDefault = preload;
    return f;
  }
}
