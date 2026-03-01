/*
 * File: UITokensControllerConditionalGetTest.java
 * Purpose: Verify ETag and conditional GET behavior for /api/v1/tokens.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.fingerprint.TokensFingerprintBuilder;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensCurrentProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensDataProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensRadiusProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensSpacingsProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontFamiliesProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontSizesProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontWeightsProvider;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts.UITokensFontsProvider;

class UITokensControllerConditionalGetTest {
  @Test
  void returns304WhenEtagMatches() {
    ThemesProviderPort themesProvider = java.util.List::of;
    GetActiveThemeUseCase getActive = new GetActiveThemeUseCase(
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
    var resolve = new ResolveCurrentSelectionUseCase(getActive, selectionQuery);
    com.poetry.poetry_backend.application.i18n.port.I18nQueryPort i18n = 
      new com.poetry.poetry_backend.application.i18n.port.I18nQueryPort() {
        @Override public String defaultLocale() { return "en"; }
        @Override public java.util.List<String> supportedLocales() { return java.util.List.of("en"); }
        @Override public String resolve(String k, String l) { return k; }
      };
    var dataProvider = new UITokensDataProvider(
        themesProvider,
        new UITokensFontsProvider(),
        new UITokensFontFamiliesProvider(),
        new UITokensFontSizesProvider(),
        new UITokensFontWeightsProvider(),
        new UITokensSpacingsProvider(),
        new UITokensRadiusProvider(),
        new UITokensCurrentProvider(resolve, i18n),
        i18n);
    var controller = new UITokensController(
        dataProvider,
        new TokensFingerprintBuilder(),
        new SaveSystemSelectionUseCase(sel -> sel),
        null,
        null);
    ResponseEntity<UITokensDto> first = controller.getTokens(null);
    assertEquals(200, first.getStatusCode().value());
    String etag = first.getHeaders().getETag();
    assertNotNull(etag);
    ResponseEntity<UITokensDto> second = controller.getTokens(etag);
    assertEquals(304, second.getStatusCode().value());
    assertEquals(etag, second.getHeaders().getETag());
  }
}
