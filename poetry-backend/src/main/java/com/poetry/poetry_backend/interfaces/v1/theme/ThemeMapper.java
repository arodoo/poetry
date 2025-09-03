/*
 * File: ThemeMapper.java
 * Purpose: Maps Theme domain objects to DTOs for REST API responses.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import java.util.List;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.domain.theme.model.Theme;

@Component
public class ThemeMapper {
  public List<ThemeDtos.ThemeResponse> map(List<Theme> themes) {
    return themes.stream().map(this::map).toList();
  }

  public ThemeDtos.ThemeResponse map(Theme theme) {
    ThemeDtos.ThemeResponse dto = new ThemeDtos.ThemeResponse();
    dto.id = theme.getId();
    dto.name = theme.getName();
    dto.active = theme.isActive();
    dto.colors = theme.getColors();
    return dto;
  }
}
