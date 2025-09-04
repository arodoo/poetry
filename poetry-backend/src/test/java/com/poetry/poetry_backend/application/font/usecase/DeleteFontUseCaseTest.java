/*
 * File: DeleteFontUseCaseTest.java
 * Purpose: Minimal test for delete use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class DeleteFontUseCaseTest {
  @Test
  void callsDeleteSoft() {
    final long[] deleted = { -1L };
    FontCommandPort cmd = new FontCommandPort() {
      @Override public FontAsset save(FontAsset asset) { return asset; }
      @Override public void deleteSoft(Long id) { deleted[0] = id; }
    };
    var use = new DeleteFontUseCase(cmd);
    use.execute(5L);
    assertEquals(5L, deleted[0]);
  }
}
