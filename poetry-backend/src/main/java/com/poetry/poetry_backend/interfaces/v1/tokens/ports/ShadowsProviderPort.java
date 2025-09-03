/*
 * File: ShadowsProviderPort.java
 * Purpose: Port interface for providing shadow sets.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.ports;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.UITokensDto;

public interface ShadowsProviderPort {
  List<UITokensDto.ShadowSet> getShadows();
}
