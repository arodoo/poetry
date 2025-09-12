/*
 * File: AuthStatusController.java
 * Purpose: Expose GET /api/v1/auth/status returning authenticated flag.
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
public class AuthStatusController {
  public record StatusResponse(boolean authenticated) {}

  @GetMapping("/status")
  public ResponseEntity<StatusResponse> status(Principal principal) {
    boolean isAuth = principal != null;
    return ResponseEntity.ok(new StatusResponse(isAuth));
  }
}
