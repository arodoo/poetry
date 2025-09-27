/*
 * File: MeController.java
 * Purpose: Expose GET /api/v1/auth/me returning minimal user identity data.
 * Returns 200 with username when authenticated, 401 otherwise. Keeps logic
 * thin delegating to Spring Security Principal only (DDD: query only).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class MeController {
  public record MeResponse(String username) {}

  @GetMapping("/me")
  public ResponseEntity<?> me(Principal principal) {
    if (principal == null) {
      return ResponseEntity.status(401).build();
    }
    return ResponseEntity.ok(new MeResponse(principal.getName()));
  }
}
