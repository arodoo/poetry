/*
 * File: FontFamiliesProviderPort.java
 * Purpose: Port for providing CSS font-family configurations to UI.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.ports;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.UITokensDto;

public interface FontFamiliesProviderPort {
  List<UITokensDto.FontFamily> getFontFamilies();
}
