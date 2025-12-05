/*
 * File: UITokensFontsProvider.java
 * Purpose: Data provider for UI fonts, supplying hardcoded font
 * options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontsProviderPort;

public class UITokensFontsProvider implements FontsProviderPort {

  @Override
  public List<UITokensDto.Font> getFonts() {
    return List.of(
        createFont("inter", "Inter",
            "https://cdn.myapp.com/fonts/inter.woff2",
            List.of(400, 500, 700), "sha256-abc123"),
        createFont("roboto", "Roboto",
            "https://cdn.myapp.com/fonts/roboto.woff2",
            List.of(400, 500, 700), "sha256-def456"),
        createFont("open-sans", "Open Sans",
            "https://cdn.myapp.com/fonts/open-sans.woff2",
            List.of(400, 600, 700), "sha256-ghi789"));
  }

  private static UITokensDto.Font createFont(String key, String label,
      String woff2Url, List<Integer> weights, String hash) {
    UITokensDto.Font font = new UITokensDto.Font();
    font.key = key;
    font.label = label;
    font.woff2Url = woff2Url;
    font.weights = weights;
    font.hash = hash;
    return font;
  }
}
