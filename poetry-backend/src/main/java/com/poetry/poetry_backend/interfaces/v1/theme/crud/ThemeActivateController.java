/*
 * File: ThemeActivateController.java
 * Purpose: REST endpoint to activate a theme.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.theme.usecase.crud.ActivateThemeUseCase;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeActivateController {
  private final ActivateThemeUseCase activateUseCase;
  private final ThemeMapper themeMapper;

  public ThemeActivateController(
      ActivateThemeUseCase activateUseCase,
      ThemeMapper themeMapper) {
    this.activateUseCase = activateUseCase;
    this.themeMapper = themeMapper;
  }

  @PutMapping("/{id}/activate")
  @PreAuthorize("hasAuthority('admin')")
  public ThemeDto.ThemeResponse activate(@PathVariable Long id) {
    return themeMapper.map(activateUseCase.execute(id));
  }
}
