/*
 * File: GetFontByIdUseCaseTest.java
 * Purpose: Minimal test for get by key use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class GetFontByIdUseCaseTest {
  @Test
  void returnsFound() {
    FontAsset fa = FontAsset.createNew("inter","Inter","inter.woff2",List.of(400),"h1",true,null);
    FontQueryPort q = new FontQueryPort() {
      @Override public java.util.List<FontAsset> findAll() { return List.of(fa); }
      @Override public Optional<FontAsset> findByKey(String key) { return Optional.of(fa); }
    };
    var use = new GetFontByIdUseCase(q);
    assertTrue(use.execute("inter").isPresent());
  }
}
