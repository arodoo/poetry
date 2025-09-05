/*
 * File: FontUpdateController.java
 * Purpose: REST endpoint for updating fonts.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.font.usecase.GetFontByIdUseCase;
import com.poetry.poetry_backend.application.font.usecase.UpdateFontUseCase;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

@RestController
@RequestMapping("/api/v1/fonts")
public class FontUpdateController {
  private final UpdateFontUseCase update;
  private final GetFontByIdUseCase getByKey;
  public FontUpdateController(UpdateFontUseCase update, GetFontByIdUseCase getByKey) {
    this.update = update;this.getByKey = getByKey;}
  @PutMapping("/{key}")
  public ResponseEntity<FontDtos.FontResponse> update(
      @PathVariable String key,
      @RequestBody FontDtos.UpdateFontRequest req) {
    return getByKey.execute(key)
        .map(existing -> doUpdate(existing, req))
        .orElse(ResponseEntity.notFound().build());
  }
  private ResponseEntity<FontDtos.FontResponse> doUpdate(
      FontAsset existing, FontDtos.UpdateFontRequest r) {
    FontAsset updated = update.execute(
        existing,
        r.label(),
        r.woff2Url(),
        r.weights(),
        r.preloadDefault(),
        r.active(),
        r.integrity());
    return ResponseEntity.ok(FontMapper.toDto(updated));
  }
}
