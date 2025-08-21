/*
 * File: VersionedPlaceholderController.java
 * Purpose: Versioned placeholder controller to support API v1 routing
 * and provide compatibility for future versioned endpoints. It acts
 * as a simple index to group versioned controllers and reduce routing
 * complexity.
 * All Rights Reserved. Arodi Emmanuel
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
