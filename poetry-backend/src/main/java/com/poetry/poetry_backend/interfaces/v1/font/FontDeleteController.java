/*
 * File: FontDeleteController.java
 * Purpose: REST endpoint for deleting fonts.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.font.usecase.DeleteFontUseCase;
import com.poetry.poetry_backend.application.font.usecase.GetFontByIdUseCase;

@RestController
@RequestMapping("/api/v1/fonts")
public class FontDeleteController {
  private final DeleteFontUseCase delete;
  private final GetFontByIdUseCase getByKey;
  public FontDeleteController(DeleteFontUseCase delete, GetFontByIdUseCase getByKey) {
    this.delete = delete;this.getByKey = getByKey;}
  @DeleteMapping("/{key}")
  public ResponseEntity<?> delete(@PathVariable String key) {
    return getByKey.execute(key)
        .map(existing -> {
          delete.execute(existing.id());
          return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
  }
}
