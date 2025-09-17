/*
 * File: MeLocaleController.java
 * Purpose: Minimal endpoint to provide current user locale to frontend.
 * Returns JSON { "locale": "<code>" } using configured defaults.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.me;

import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;

@RestController
@RequestMapping("/api/v1/me")
public class MeLocaleController {
  private final AppConfigPort cfg;

  public MeLocaleController(AppConfigPort cfg) { this.cfg = cfg; }

  public record LocaleDto(String locale) { }

  @GetMapping("/locale")
  public ResponseEntity<LocaleDto> getLocale(
      @RequestHeader(value = "X-User-Id", required = false) String userId) {
    String def = cfg.defaultLocale();
    List<String> supported = cfg.supportedLocales();
    String resolved = supported.contains(def) ? def : "en";
    // Future: resolve by userId; for now, return default.
    Objects.toString(userId, "anonymous"); // placeholder to avoid null issues if later logged
    return ResponseEntity.ok(new LocaleDto(resolved));
  }
}
