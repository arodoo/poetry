/*
 * File: UITokensShadowsProvider.java
 * Purpose: Data provider for UI shadow sets, supplying hardcoded
 * shadow options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ShadowsProviderPort;

@Component
public class UITokensShadowsProvider implements ShadowsProviderPort {

  @Override
  public List<UITokensDto.ShadowSet> getShadows() {
    return List.of(
        createShadowSet("flat", "Flat", Map.of(
            "sm", "none", // i18n-ignore
            "md", "none", // i18n-ignore
            "lg", "none" // i18n-ignore
        )),
        createShadowSet("subtle", "Subtle", Map.of(
            "sm", "0 1px 2px 0 rgb(0 0 0 / 0.05)", // i18n-ignore
            "md", "0 4px 6px -1px rgb(0 0 0 / 0.1)", // i18n-ignore
            "lg", "0 10px 15px -3px rgb(0 0 0 / 0.1)" // i18n-ignore
        )),
        createShadowSet("elevated", "Elevated", Map.of(
            "sm", "0 2px 4px 0 rgb(0 0 0 / 0.1)", // i18n-ignore
            "md", "0 8px 12px -2px rgb(0 0 0 / 0.15)", // i18n-ignore
            "lg", "0 20px 25px -5px rgb(0 0 0 / 0.15)" // i18n-ignore
        )));
  }

  private static UITokensDto.ShadowSet createShadowSet(String key,
      String label, Map<String, String> values) {
    UITokensDto.ShadowSet set = new UITokensDto.ShadowSet();
    set.key = key;
    set.label = label;
    set.values = values;
    return set;
  }
}
