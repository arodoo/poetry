/*
 * File: UITokensPreloadDefaultFontProviderTest.java
 * Purpose: Provides shared builder helpers for preloadDefault font selection tests.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;
import java.util.Map;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;

abstract class UITokensPreloadDefaultFontProviderTest {
  protected ThemesProviderPort singleTheme() {
    return () -> {
      UITokensDto.Theme t = new UITokensDto.Theme();
      t.key = "alpha"; t.label = "Alpha"; t.colors = Map.of("c", "#fff");
      return List.of(t);
    };
  }
  protected UITokensDto.Font font(
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
