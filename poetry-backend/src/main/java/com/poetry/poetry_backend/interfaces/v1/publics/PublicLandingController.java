/*
 * File: PublicLandingController.java
 * Purpose: Public landing page endpoint returning marketing content
 * and feature highlights without requiring authentication.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.publics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public")
public class PublicLandingController {

  public record PublicLandingResponse(
      String title, String description, String version) {}

  @GetMapping("/landing")
  public ResponseEntity<PublicLandingResponse> getLanding() {
    PublicLandingResponse response = new PublicLandingResponse(
        "Poetry Platform",
        "Creative writing platform for poets and writers", "1.0.0");
    return ResponseEntity.ok(response);
  }
}
