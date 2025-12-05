/*
 * File: UITokensSpacingsProvider.java
 * Purpose: Data provider for UI spacing sets, supplying hardcoded
 * spacing options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.SpacingsProviderPort;

@Component
public class UITokensSpacingsProvider implements SpacingsProviderPort {

  @Override
  public List<UITokensDto.SpacingSet> getSpacings() {
    return List.of(
        createSpacingSet("tight", "Tight", Map.of(
            "xs", "0.125rem", "sm", "0.25rem", "md", "0.5rem",
            "lg", "0.75rem", "xl", "1rem")),
        createSpacingSet("default", "Default", Map.of(
            "xs", "0.25rem", "sm", "0.5rem", "md", "1rem",
            "lg", "1.5rem", "xl", "2rem")),
        createSpacingSet("comfortable", "Comfortable", Map.of(
            "xs", "0.5rem", "sm", "0.75rem", "md", "1.5rem",
            "lg", "2rem", "xl", "3rem")));
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
