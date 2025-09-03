/*
 * File: ThemeWriteController.java
 * Purpose: REST endpoints for modifying theme data.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.theme.usecase.ActivateThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.CreateThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.DeleteThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.UpdateThemeUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeWriteController {
  private final CreateThemeUseCase create;
  private final UpdateThemeUseCase update;
  private final DeleteThemeUseCase delete;
  private final ActivateThemeUseCase activate;
  private final ThemeMapper mapper;

  public ThemeWriteController(
      CreateThemeUseCase create,
      UpdateThemeUseCase update,
      DeleteThemeUseCase delete,
      ActivateThemeUseCase activate,
      ThemeMapper mapper) {
    this.create = create;
    this.update = update;
    this.delete = delete;
    this.activate = activate;
    this.mapper = mapper;
  }

  @PostMapping
  public ResponseEntity<ThemeDtos.ThemeResponse> create(
      @RequestBody ThemeDtos.CreateRequest request) {
    String key = request.key;
    if (key == null || key.isBlank()) {
      // Backward compatibility: derive key from name (lowercase kebab) if not provided.
      key = request.name == null
          ? "auto"
          : request.name.toLowerCase()
              .replaceAll("[^a-z0-9]+", "-")
              .replaceAll("^-|-$", "");
    }
    Theme theme = create.execute(key, request.name, request.colors);
    return ResponseEntity
        .created(URI.create("/api/v1/themes/" + theme.getId()))
        .body(mapper.map(theme));
  }

  @PutMapping("/{id}")
  public ThemeDtos.ThemeResponse update(
      @PathVariable Long id,
      @RequestBody ThemeDtos.UpdateRequest request) {
    return mapper.map(update.execute(id, request.name, request.colors));
  }

  @PutMapping("/{id}/activate")
  public ThemeDtos.ThemeResponse activate(@PathVariable Long id) {
    return mapper.map(activate.execute(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    delete.execute(id);
    return ResponseEntity.noContent().build();
  }
}
