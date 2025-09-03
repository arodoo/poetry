/*
 * File: UITokensThemesDynamicProvider.java
 * Purpose: Dynamic provider mapping persisted themes into UI token
 * DTOs replacing previous hardcoded provider.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.theme.usecase.GetAllThemesUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;

@Component
public class UITokensThemesDynamicProvider {
  private final GetAllThemesUseCase getAllThemesUseCase;

  public UITokensThemesDynamicProvider(GetAllThemesUseCase getAllThemesUseCase) {
    this.getAllThemesUseCase = getAllThemesUseCase;
  }

  public List<UITokensDto.Theme> getThemes() {
    return getAllThemesUseCase.execute().stream().map(this::map)
        .collect(Collectors.toList());
  }

  private UITokensDto.Theme map(Theme theme) {
    UITokensDto.Theme dto = new UITokensDto.Theme();
    dto.key = String.valueOf(theme.getId());
    dto.label = theme.getName();
    dto.colors = theme.getColors();
    return dto;
  }
}
