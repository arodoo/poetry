/*
 * File: ResolveCurrentSelectionHelpers.java
 * Purpose: Helper methods for ResolveCurrentSelectionUseCase.
 * Provides utility functions for fallback logic and key resolution.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase.selection;

import java.util.List;
import java.util.function.Function;

import com.poetry.poetry_backend.application.theme.usecase.crud.GetActiveThemeUseCase;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

public class ResolveCurrentSelectionHelpers {
  public static String resolveThemeKey(GetActiveThemeUseCase getActiveThemeUseCase,
      List<UITokensDto.Theme> themes) {
    try {
      return getActiveThemeUseCase.execute().getKey();
    } catch (Exception ex) {
      return fallbackThemeKey(themes);
    }
  }

  public static String fallbackThemeKey(List<UITokensDto.Theme> themes) {
    return themes.stream().findFirst().map(t -> t.key).orElse("default");
  }

  public static <T> String first(List<T> list, Function<T, String> f, String fallback) {
    return list.stream().findFirst().map(f).orElse(fallback);
  }
}