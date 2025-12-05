/*
 * File: FontsProviderPort.java
 * Purpose: Port interface for providing font DTOs.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.ports;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

public interface FontsProviderPort {
  List<UITokensDto.Font> getFonts();
}
