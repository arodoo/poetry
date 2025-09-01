/*
 * File: UITokensController.java
 * Purpose: Controller for UI tokens endpoint, providing themes,
 * fonts and customization options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UITokensController {
  private final UITokensDataProvider provider;

  public UITokensController(UITokensDataProvider provider) {
    this.provider = provider;
  }

  @GetMapping("/tokens")
  public ResponseEntity<UITokensDto> getTokens() {
    return ResponseEntity.ok(provider.getTokens());
  }
}
