/*
 Simple versioned controller that exposes a health probe under /api/v1.
 It returns a minimal JSON payload that clients and monitors can use to
 verify service availability. This controller is intentionally small and
 independent from domain logic to avoid coupling presentation and core
 layers, following Clean Architecture. All Rights Reserved. Arodi
 Emmanuel
*/
package com.poetry.poetry_backend.interfaces.v1;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class VersionedPlaceholderController {
  @GetMapping("/health")
  public ResponseEntity<Map<String, String>> health() {
    return ResponseEntity.ok(Map.of("status", "ok"));
  }
}
