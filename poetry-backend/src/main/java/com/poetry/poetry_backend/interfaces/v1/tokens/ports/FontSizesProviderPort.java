/*
 * File: FontSizesProviderPort.java
 * Purpose: Port interface for providing font size sets.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.ports;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

public interface FontSizesProviderPort {
  List<UITokensDto.FontSizeSet> getFontSizes();
}
