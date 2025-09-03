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

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;

class UITokensCurrentSelectionTest {
  @Test
  void fallbackThemeKeyUsedWhenNoActive() {
    // Provide two themes (simulated) and ensure first ordering chosen.
    ThemesProviderPort themesProvider = () -> {
      UITokensDto.Theme a = new UITokensDto.Theme();
      a.key = "alpha"; a.label = "Alpha"; a.colors = Map.of("c","#fff");
      UITokensDto.Theme b = new UITokensDto.Theme();
      b.key = "beta"; b.label = "Beta"; b.colors = Map.of("c","#000");
      return List.of(a,b);
    };
    var dataProvider = new UITokensDataProvider(
        themesProvider,
        new UITokensFontsProvider(),
        new UITokensFontSizesProvider(),
        new UITokensFontWeightsProvider(),
        new UITokensSpacingsProvider(),
        new UITokensRadiusProvider(),
        new UITokensShadowsProvider(),
        new UITokensCurrentProvider(null));
    UITokensDto dto = dataProvider.getTokens();
    assertEquals("alpha", dto.current.theme);
  }
}
