/*
 * File: UITokensRadiusProvider.java
 * Purpose: Data provider for UI radius sets, supplying hardcoded
 * border radius options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.RadiusProviderPort;

@Component
public class UITokensRadiusProvider implements RadiusProviderPort {

  @Override
  public List<UITokensDto.RadiusSet> getRadius() {
    return List.of(
        createRadiusSet("sharp", "Sharp", Map.of(
            "sm", "0rem", "md", "0rem", "lg", "0rem")),
        createRadiusSet("default", "Default", Map.of(
            "sm", "0.125rem", "md", "0.375rem", "lg", "0.5rem")),
        createRadiusSet("rounded", "Rounded", Map.of(
            "sm", "0.25rem", "md", "0.5rem", "lg", "1rem")));
  }

  private static UITokensDto.RadiusSet createRadiusSet(String key,
      String label, Map<String, String> values) {
    UITokensDto.RadiusSet set = new UITokensDto.RadiusSet();
    set.key = key;
    set.label = label;
    set.values = values;
    return set;
  }
}
