/*
 * File: UITokensFontSizesProvider.java
 * Purpose: Data provider for UI font size sets, supplying hardcoded
 * font size options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontSizesProviderPort;

@Component
public class UITokensFontSizesProvider implements FontSizesProviderPort {

  @Override
  public List<UITokensDto.FontSizeSet> getFontSizes() {
    return List.of(
        createFontSizeSet("compact", "Compact", Map.of(
            "xs", "0.625rem", "sm", "0.75rem", "base", "0.875rem",
            "lg", "1rem", "xl", "1.125rem")),
        createFontSizeSet("default", "Default", Map.of(
            "xs", "0.75rem", "sm", "0.875rem", "base", "1rem",
            "lg", "1.125rem", "xl", "1.25rem")),
        createFontSizeSet("comfortable", "Comfortable", Map.of(
            "xs", "0.875rem", "sm", "1rem", "base", "1.125rem",
            "lg", "1.25rem", "xl", "1.5rem")));
  }

  private static UITokensDto.FontSizeSet createFontSizeSet(String key,
      String label, Map<String, String> sizes) {
    UITokensDto.FontSizeSet set = new UITokensDto.FontSizeSet();
    set.key = key;
    set.label = label;
    set.sizes = sizes;
    return set;
  }
}
