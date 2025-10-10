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
import com.poetry.poetry_backend.application.theme.usecase.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.application.theme.usecase.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;


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
        public java.util.Optional<Theme> findActive() {
          return java.util.Optional.empty();
        }
      }
    );
    CustomizationSelectionQueryPort selectionQuery =
      java.util.Optional::<UiCustomizationSelection>empty;
    var resolve = new ResolveCurrentSelectionUseCase(getActive, selectionQuery);
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
    ResponseEntity<UITokensDto> first = controller.getTokens(null);
    assertEquals(200, first.getStatusCode().value());
    String etag = first.getHeaders().getETag();
    assertNotNull(etag);
    ResponseEntity<UITokensDto> second = controller.getTokens(etag);
    assertEquals(304, second.getStatusCode().value());
    assertEquals(etag, second.getHeaders().getETag());
  }
}
