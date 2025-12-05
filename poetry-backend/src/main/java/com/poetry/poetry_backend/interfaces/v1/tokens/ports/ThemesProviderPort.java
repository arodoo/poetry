/*
 * File: ThemesProviderPort.java
 * Purpose: Port interface for providing theme DTOs to UI tokens assembly.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.ports;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

public interface ThemesProviderPort {
  List<UITokensDto.Theme> getThemes();
}
