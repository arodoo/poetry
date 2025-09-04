/*
 * File: UpdateFontUseCaseTest.java
 * Purpose: Minimal test for update use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class UpdateFontUseCaseTest {
  @Test
  void updatesFont() {
    FontAsset base = FontAsset.createNew(
      "inter",
      "Inter",
      "inter.woff2",
      List.of(400),
      "h1",
      true,
      null
    );
    FontCommandPort cmd = new FontCommandPort() {
      @Override public FontAsset save(FontAsset asset) { return asset; }
      @Override public void deleteSoft(Long id) { }
    };
    var use = new UpdateFontUseCase(cmd);
    FontAsset updated = use.execute(
      base,
      "Inter UI",
      "new.woff2",
      List.of(400,700),
      false,
      true,
      null
    );
    assertEquals("Inter UI", updated.label());
  }
}
