/*
 File: ApiIndexController.java
 Purpose: API discovery index controller exposing API root links.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiIndexController {
    @GetMapping
    public ResponseEntity<Map<String, String>> index() {
        return ResponseEntity.ok(Map.of(
                "v1", "/api/v1",
                "docs", "/v3/api-docs",
                "swagger", "/swagger-ui.html"
        ));
    }
}
