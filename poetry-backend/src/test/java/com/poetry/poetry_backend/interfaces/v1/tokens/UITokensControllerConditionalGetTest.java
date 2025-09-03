/*
 * File: UITokensControllerConditionalGetTest.java
 * Purpose: Verify ETag and conditional GET behavior for /api/v1/tokens.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;

class UITokensControllerConditionalGetTest {
  @Test
  void returns304WhenEtagMatches() {
    // Minimal manual wiring using real providers.
    ThemesProviderPort themesProvider = () -> java.util.List.of();
  var dataProvider = new UITokensDataProvider(
    themesProvider,
    new UITokensFontsProvider(),
    new UITokensFontSizesProvider(),
    new UITokensFontWeightsProvider(),
    new UITokensSpacingsProvider(),
    new UITokensRadiusProvider(),
    new UITokensShadowsProvider(),
    new UITokensCurrentProvider(null));
    var fingerprint = new TokensFingerprintBuilder();
    var controller = new UITokensController(dataProvider, fingerprint);

    ResponseEntity<UITokensDto> first = controller.getTokens(null);
    assertEquals(200, first.getStatusCode().value());
    String etag = first.getHeaders().getETag();
    assertNotNull(etag);

    ResponseEntity<UITokensDto> second = controller.getTokens(etag);
    assertEquals(304, second.getStatusCode().value());
    assertEquals(etag, second.getHeaders().getETag());
  }
}
