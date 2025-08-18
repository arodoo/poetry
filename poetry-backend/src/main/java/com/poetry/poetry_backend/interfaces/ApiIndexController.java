/*
 File: ApiIndexController.java
 Purpose: Provides an API discovery index under /api. It lists versions
   and documentation endpoints to help clients navigate the service.
   The controller is stateless and returns a simple map response.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.interfaces;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiIndexController {
  @GetMapping
  public ResponseEntity<Map<String, String>> index() {
    return ResponseEntity.ok(
        Map.of(
            "v1", "/api/v1",
            "docs", "/v3/api-docs",
            "swagger", "/swagger-ui.html"));
  }
}
