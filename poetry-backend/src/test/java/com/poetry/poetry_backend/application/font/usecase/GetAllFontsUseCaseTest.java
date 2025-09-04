/*
 * File: GetAllFontsUseCaseTest.java
 * Purpose: Minimal test for list use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class GetAllFontsUseCaseTest {
  @Test
  void returnsList() {
    FontQueryPort q = new FontQueryPort() {
      @Override
      public List<FontAsset> findAll() {
        return List.of(
          FontAsset.createNew(
            "inter",
            "Inter",
            "inter.woff2",
            List.of(400),
            "h1",
            true,
            null
          )
        );
      }
      @Override
      public java.util.Optional<FontAsset> findByKey(String key) {
        return java.util.Optional.empty();
      }
    };
    var use = new GetAllFontsUseCase(q);
    assertFalse(use.execute().isEmpty());
  }
}
