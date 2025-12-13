/*
 * File: UITokensControllerEtagNormalizationTest.java
 * Purpose: Ensure /api/v1/tokens treats quoted and unquoted If-None-Match ETag equally.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.fingerprint.TokensFingerprintBuilder;
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

class UITokensControllerEtagNormalizationTest {
  @Test
  void returns304ForQuotedAndUnquotedEtag() {
    ThemesProviderPort themesProvider = java.util.List::of;
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
    var controller = new UITokensController(
        dataProvider,
        new TokensFingerprintBuilder(),
        new SaveSystemSelectionUseCase(sel -> sel));
    var first = controller.getTokens(null);
    String quoted = first.getHeaders().getETag();
    assertNotNull(quoted);
    String unquoted = quoted.replace("\"", "");
    var resUnquoted = controller.getTokens(unquoted);
    assertEquals(304, resUnquoted.getStatusCode().value());
    var resQuoted = controller.getTokens(quoted);
    assertEquals(304, resQuoted.getStatusCode().value());
  }
}
