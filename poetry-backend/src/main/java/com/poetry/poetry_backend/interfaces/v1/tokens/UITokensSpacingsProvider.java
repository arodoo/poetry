/*
 * File: UITokensSpacingsProvider.java
 * Purpose: Data provider for UI spacing sets, supplying hardcoded
 * spacing options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;
import java.util.Map;

public class UITokensSpacingsProvider {

  public static List<UITokensDto.SpacingSet> getSpacings() {
    return List.of(
      createSpacingSet("default", "Default", Map.of(
        "xs", "0.25rem", "sm", "0.5rem", "md", "1rem",
        "lg", "1.5rem", "xl", "2rem"
      ))
    );
  }

  private static UITokensDto.SpacingSet createSpacingSet(String key,
      String label, Map<String, String> values) {
    UITokensDto.SpacingSet set = new UITokensDto.SpacingSet();
    set.key = key;
    set.label = label;
    set.values = values;
    return set;
  }
}
