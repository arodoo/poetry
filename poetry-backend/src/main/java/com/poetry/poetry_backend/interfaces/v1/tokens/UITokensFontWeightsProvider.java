/*
 * File: UITokensFontWeightsProvider.java
 * Purpose: Data provider for font weights list (numeric values only). It supplies standard CSS font weight tokens. Frontend maps these to semantic labels locally.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontWeightsProviderPort;

@Component
public final class UITokensFontWeightsProvider implements FontWeightsProviderPort {
  @Override
  public List<String> getFontWeights() { return List.of("400", "500", "700"); }
}
