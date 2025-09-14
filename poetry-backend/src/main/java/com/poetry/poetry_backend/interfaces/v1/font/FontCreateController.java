/*
 * File: FontCreateController.java
 * Purpose: REST endpoint for creating fonts.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.font.usecase.CreateFontUseCase;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

@RestController
@RequestMapping("/api/v1/fonts")
public class FontCreateController {
  private final CreateFontUseCase create;
  public FontCreateController(CreateFontUseCase create) {this.create = create;}
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping
  public ResponseEntity<FontDtos.FontResponse> create(@RequestBody FontDtos.CreateFontRequest req) {
    FontAsset saved = create.execute(
        req.key(),
        req.label(),
        req.woff2Url(),
        req.weights(),
        req.hash(),
        req.preloadDefault(),
        req.integrity());
    return ResponseEntity
        .created(URI.create("/api/v1/fonts/" + saved.key()))
        .body(FontMapper.toDto(saved));
  }
}
