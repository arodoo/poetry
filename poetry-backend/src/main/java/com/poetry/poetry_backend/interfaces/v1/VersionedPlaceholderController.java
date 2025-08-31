/*
 * File: VersionedPlaceholderController.java
 * Purpose: Versioned placeholder controller to support API v1 routing
 * and provide compatibility for future versioned endpoints. It acts
 * as a simple index to group versioned controllers and reduce routing
 * complexity. Legacy locale preference dependency removed after i18n
 * module refactor. Adds localized health status using i18n use case.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;

@RestController
@RequestMapping("/api/v1")
public class VersionedPlaceholderController {
  private final ResolveMessageUseCase resolveMessage;
  public VersionedPlaceholderController(ResolveMessageUseCase resolveMessage) {
    this.resolveMessage = resolveMessage;
  }
  @GetMapping("/health")
  public ResponseEntity<Map<String, Object>> health(
      @RequestHeader(name = "Accept-Language", required = false)
      String locale) {
    Map<String, Object> health = new LinkedHashMap<>();
    health.put("status", resolveMessage.execute("common.ok", locale));
    health.put("timestamp", System.currentTimeMillis());
    return ResponseEntity.ok(health);
  }
}
