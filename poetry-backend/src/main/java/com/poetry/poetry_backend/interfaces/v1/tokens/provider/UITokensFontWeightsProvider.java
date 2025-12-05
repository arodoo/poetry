/*
 * File: UITokensFontWeightsProvider.java
 * Purpose: Data provider for font weights list (numeric values).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

import java.util.List;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontWeightsProviderPort;

@Component
public final class UITokensFontWeightsProvider implements FontWeightsProviderPort {
  @Override
  public List<String> getFontWeights() {
    return List.of("400", "500", "700");
  }
}
