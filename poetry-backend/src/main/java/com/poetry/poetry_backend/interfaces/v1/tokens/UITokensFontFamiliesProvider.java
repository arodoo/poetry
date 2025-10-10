/*
 * File: UITokensFontFamiliesProvider.java
 * Purpose: Data provider for CSS font-family strings mapped to font keys.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontFamiliesProviderPort;

@Component
public class UITokensFontFamiliesProvider implements FontFamiliesProviderPort {

  @Override
  public List<UITokensDto.FontFamily> getFontFamilies() {
    return List.of(
        createFontFamily("inter", "Inter", "Inter, sans-serif"),
        createFontFamily("roboto", "Roboto", "Roboto, sans-serif"),
        createFontFamily("open-sans", "Open Sans", "'Open Sans', sans-serif"));
  }

  private static UITokensDto.FontFamily createFontFamily(String key, String label, String family) {
    UITokensDto.FontFamily ff = new UITokensDto.FontFamily();
    ff.key = key;
    ff.label = label;
    ff.family = family;
    return ff;
  }
}
