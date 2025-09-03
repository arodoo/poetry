/*
 * File: VersionedPlaceholderController.java
 * Purpose: Versioned placeholder controller to support API v1 routing
 * and provide compatibility for future versioned endpoints. It acts
 * as a simple index to group versioned controllers and reduce routing
 * complexity. Legacy locale preference dependency removed after i18n
 * module refactor. Adds localized health status using i18n use case
 * and includes theme module runtime status (count & active theme).
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.api;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;
import com.poetry.poetry_backend.application.theme.usecase.GetAllThemesUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;

@RestController
@RequestMapping("/api/v1")
public class VersionedPlaceholderController {
  private final ResolveMessageUseCase resolveMessage;
  private final GetAllThemesUseCase getAllThemes;
  public VersionedPlaceholderController(
      ResolveMessageUseCase resolveMessage,
      GetAllThemesUseCase getAllThemes) {
    this.resolveMessage = resolveMessage;
    this.getAllThemes = getAllThemes;
  }
  @GetMapping("/health")
  public ResponseEntity<Map<String, Object>> health() {
    Map<String, Object> body = new LinkedHashMap<>();
    String tag = LocaleContextHolder.getLocale().toLanguageTag();
    List<Theme> themes = getAllThemes.execute();
    Optional<Theme> active = themes.stream().filter(Theme::isActive).findFirst();
    body.put("status", resolveMessage.execute("common.ok", tag));
    body.put("timestamp", System.currentTimeMillis());
    body.put("themesCount", themes.size());
    body.put("activeThemeId", active.map(Theme::getId).orElse(null));
    body.put("activeThemeName", active.map(Theme::getName).orElse(null));
    return ResponseEntity.ok(body);
  }
}
