/*
 * File: VersionedPlaceholderController.java
 * Purpose: Versioned placeholder controller to support API v1 routing
 * and provide compatibility for future versioned endpoints. It acts
 * as a simple index to group versioned controllers and reduce routing
 * complexity.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.locale.LocalePreferenceService;

@RestController
@RequestMapping("/api/v1")
public class VersionedPlaceholderController {
  private final LocalePreferenceService localeService;

  public VersionedPlaceholderController(LocalePreferenceService localeService) {
    this.localeService = localeService;
  }

  @GetMapping("/health")
  public ResponseEntity<Map<String, Object>> health() {
    Map<String, Object> health = new LinkedHashMap<>();
    health.put("status", "ok");
    health.put("timestamp", System.currentTimeMillis());

    // Check locale service health
    try {
      String testLocale = localeService.resolveLocaleForUser("health-check", null);
      health.put("localeService", Map.of(
        "status", "ok",
        "defaultLocale", testLocale
      ));
    } catch (Exception e) {
      health.put("localeService", Map.of(
        "status", "error",
        "error", e.getMessage()
      ));
      health.put("status", "degraded");
    }

    return ResponseEntity.ok(health);
  }
}
