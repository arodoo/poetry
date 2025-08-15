/*
 File: VersionedPlaceholderController.java
 Purpose: Versioned v1 placeholder endpoint for health checks.
 All Rights Reserved. Emmanuel
*/
package com.poetry.poetry_backend.interfaces.v1;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class VersionedPlaceholderController {
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
}
