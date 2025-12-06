/*
 * File: ThemeCreateController.java
 * Purpose: REST endpoint to create themes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme.crud;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.theme.usecase.crud.CreateThemeUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.interfaces.v1.theme.ThemeDto;
import com.poetry.poetry_backend.interfaces.v1.theme.ThemeMapper;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeCreateController {
  private final CreateThemeUseCase createUseCase;
  private final ThemeMapper themeMapper;

  public ThemeCreateController(
      CreateThemeUseCase createUseCase,
      ThemeMapper themeMapper) {
    this.createUseCase = createUseCase;
    this.themeMapper = themeMapper;
  }

  @PostMapping
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<ThemeDto.ThemeResponse> create(
      @RequestBody ThemeDto.CreateRequest request) {
    String key = request.key;
    if (key == null || key.isBlank()) {
      key = request.name == null
          ? "auto"
          : request.name
              .toLowerCase()
              .replaceAll("[^a-z0-9]+", "-")
              .replaceAll("^-|-$", "");
    }
    Theme theme = createUseCase.execute(key, request.name, request.colors);
    return ResponseEntity
        .created(URI.create("/api/v1/themes/" + theme.getId()))
        .body(themeMapper.map(theme));
  }
}
