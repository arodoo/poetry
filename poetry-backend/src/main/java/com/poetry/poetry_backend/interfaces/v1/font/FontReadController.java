/*
 * File: FontReadController.java
 * Purpose: REST endpoints for reading font assets.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.font.usecase.GetAllFontsUseCase;
import com.poetry.poetry_backend.application.font.usecase.GetFontByIdUseCase;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

@RestController
@RequestMapping("/api/v1/fonts")
public class FontReadController {
  private final GetAllFontsUseCase getAll;
  private final GetFontByIdUseCase getByKey;

  public FontReadController(GetAllFontsUseCase getAll, GetFontByIdUseCase getByKey) {
    this.getAll = getAll;
    this.getByKey = getByKey;
  }

  @GetMapping
  public List<FontDto.FontResponse> list() {
    return getAll.execute().stream().map(FontReadController::toDto).collect(Collectors.toList());
  }

  @GetMapping("/{key}")
  public ResponseEntity<FontDto.FontResponse> byKey(@PathVariable String key) {
    return getByKey.execute(key)
        .map(f -> ResponseEntity.ok(toDto(f)))
        .orElse(ResponseEntity.notFound().build());
  }

  private static FontDto.FontResponse toDto(FontAsset a) {
    return new FontDto.FontResponse(
        a.key(),
        a.label(),
        a.woff2Url(),
        a.weights(),
        a.hash(),
        a.preloadDefault(),
        a.active(),
        a.integrity());
  }
}
