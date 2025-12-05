/*
 * File: UITokensThemesDynamicProvider.java
 * Purpose: Dynamic provider mapping persisted themes into UI token
 * DTOs replacing previous hardcoded provider.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.theme.usecase.GetAllThemesUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;

@Component
public class UITokensThemesDynamicProvider implements ThemesProviderPort {
  private final GetAllThemesUseCase getAllThemesUseCase;

  public UITokensThemesDynamicProvider(GetAllThemesUseCase getAllThemesUseCase) {
    this.getAllThemesUseCase = getAllThemesUseCase;
  }

  @Override
  public List<UITokensDto.Theme> getThemes() {
    return getAllThemesUseCase.execute().stream()
        .sorted(Comparator.comparing(Theme::getKey))
        .map(this::map)
        .collect(Collectors.toList());
  }

  private UITokensDto.Theme map(Theme theme) {
    UITokensDto.Theme dto = new UITokensDto.Theme();
    dto.key = theme.getKey();
    dto.label = theme.getName();
    dto.colors = theme.getColors();
    return dto;
  }
}
