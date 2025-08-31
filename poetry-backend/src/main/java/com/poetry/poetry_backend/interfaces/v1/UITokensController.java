/*
 * File: UITokensController.java
 * Purpose: Controller for UI tokens endpoint, providing themes, fonts,
 * and customization options for frontend UI library configuration.
 * Supports decoupled customization of colors, fonts, spacings, etc.
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

  @GetMapping("/tokens")
  public ResponseEntity<UITokensDto> getTokens() {
    UITokensDto tokens = UITokensDataProvider.getTokens();
    return ResponseEntity.ok(tokens);
  }
}
