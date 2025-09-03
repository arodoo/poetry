/*
 * File: UITokensControllerEtagNormalizationTest.java
 * Purpose: Ensure /api/v1/tokens treats quoted and unquoted If-None-Match ETag equally.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;

class UITokensControllerEtagNormalizationTest {
  @Test
  void returns304ForQuotedAndUnquotedEtag() {
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
    var controller = new UITokensController(dataProvider, new TokensFingerprintBuilder());
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
