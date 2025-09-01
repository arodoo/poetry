/*
 * File: ThemeController.java
 * Purpose: REST endpoints for theme CRUD and activation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.theme.usecase.*;
import com.poetry.poetry_backend.domain.theme.model.Theme;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeController {
  private final GetAllThemesUseCase getAll;
  private final GetThemeByIdUseCase getById;
  private final GetActiveThemeUseCase getActive;
  private final CreateThemeUseCase create;
  private final UpdateThemeUseCase update;
  private final DeleteThemeUseCase delete;
  private final ActivateThemeUseCase activate;
  public ThemeController(
      GetAllThemesUseCase a,
      GetThemeByIdUseCase b,
      GetActiveThemeUseCase c,
      CreateThemeUseCase d,
      UpdateThemeUseCase e,
      DeleteThemeUseCase f,
      ActivateThemeUseCase g) {
    this.getAll = a; this.getById = b; this.getActive = c;
    this.create = d; this.update = e; this.delete = f; this.activate = g;
  }
  @GetMapping
  public List<ThemeDtos.ThemeResponse> list() { return map(getAll.execute()); }
  @GetMapping("/active")
  public ThemeDtos.ThemeResponse active() { return map(getActive.execute()); }
  @GetMapping("/{id}")
  public ThemeDtos.ThemeResponse byId(@PathVariable Long id) {
    return map(getById.execute(id));
  }
  @PostMapping
  public ResponseEntity<ThemeDtos.ThemeResponse> create(
      @RequestBody ThemeDtos.CreateRequest r) {
    Theme t = create.execute(r.name, r.colors);
    return ResponseEntity
        .created(URI.create("/api/v1/themes/" + t.getId()))
        .body(map(t));
  }
  @PutMapping("/{id}")
  public ThemeDtos.ThemeResponse update(
      @PathVariable Long id,
      @RequestBody ThemeDtos.UpdateRequest r) {
    return map(update.execute(id, r.name, r.colors));
  }
  @PutMapping("/{id}/activate")
  public ThemeDtos.ThemeResponse activate(@PathVariable Long id) {
    return map(activate.execute(id));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    delete.execute(id);
    return ResponseEntity.noContent().build();
  }
  private List<ThemeDtos.ThemeResponse> map(List<Theme> list) {
    return list.stream().map(this::map).toList();
  }
  private ThemeDtos.ThemeResponse map(Theme t) {
    ThemeDtos.ThemeResponse dto = new ThemeDtos.ThemeResponse();
    dto.id = t.getId(); dto.name = t.getName(); dto.active = t.isActive();
    dto.colors = t.getColors(); return dto;
  }
}
