/*
 * File: ThemeReadController.java
 * Purpose: REST endpoints for reading theme data.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.theme.usecase.crud.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetAllThemesUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetThemeByIdUseCase;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeReadController {
  private final GetAllThemesUseCase getAll;
  private final GetThemeByIdUseCase getById;
  private final GetActiveThemeUseCase getActive;
  private final ThemeMapper mapper;

  public ThemeReadController(
      GetAllThemesUseCase getAll,
      GetThemeByIdUseCase getById,
      GetActiveThemeUseCase getActive,
      ThemeMapper mapper) {
    this.getAll = getAll;
    this.getById = getById;
    this.getActive = getActive;
    this.mapper = mapper;
  }

  @GetMapping
  public List<ThemeDto.ThemeResponse> list() {
    return mapper.map(getAll.execute());
  }

  @GetMapping("/active")
  public ThemeDto.ThemeResponse active() {
    return mapper.map(getActive.execute());
  }

  @GetMapping("/{id}")
  public ThemeDto.ThemeResponse byId(@PathVariable Long id) {
    return mapper.map(getById.execute(id));
  }
}
