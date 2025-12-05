/*
 * File: ThemeUpdateController.java
 * Purpose: REST endpoint to update themes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.theme.usecase.crud.UpdateThemeUseCase;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeUpdateController {
  private final UpdateThemeUseCase updateUseCase;
  private final ThemeMapper themeMapper;

  public ThemeUpdateController(
      UpdateThemeUseCase updateUseCase,
      ThemeMapper themeMapper) {
    this.updateUseCase = updateUseCase;
    this.themeMapper = themeMapper;
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('admin')")
  public ThemeDto.ThemeResponse update(
      @PathVariable Long id,
      @RequestBody ThemeDto.UpdateRequest request) {
    return themeMapper.map(updateUseCase.execute(id, request.name, request.colors));
  }
}
