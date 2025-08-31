/*
 * File: UITokensFontsProvider.java
 * Purpose: Data provider for UI fonts, supplying hardcoded font
 * options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1;

import java.util.List;

public class UITokensFontsProvider {

  public static List<UITokensDto.Font> getFonts() {
    return List.of(
      createFont("Inter", "Inter",
        "https://cdn.myapp.com/fonts/inter.woff2",
        List.of(400, 500, 700), "sha256-abc123"),
      createFont("Roboto", "Roboto",
        "https://cdn.myapp.com/fonts/roboto.woff2",
        List.of(400, 500, 700), "sha256-def456")
    );
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
