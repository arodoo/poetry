/*
 * File: UITokensThemesProvider.java
 * Purpose: Deprecated hardcoded themes provider (kept temporarily).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.provider.themes;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

@Deprecated
public class UITokensThemesProvider {
  public static List<UITokensDto.Theme> getThemes() {
    return java.util.Collections.emptyList();
  }
}
