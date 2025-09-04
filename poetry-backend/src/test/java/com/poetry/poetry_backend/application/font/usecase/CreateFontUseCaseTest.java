/*
 * File: CreateFontUseCaseTest.java
 * Purpose: Basic construction path test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class CreateFontUseCaseTest {
  @Test
  void createsFont() {
    FontCommandPort cmd = new FontCommandPort() {
      @Override public FontAsset save(FontAsset asset) { return asset; }
      @Override public void deleteSoft(Long id) { }
    };
    var use = new CreateFontUseCase(cmd);
    FontAsset created = use.execute("inter","Inter","inter.woff2",List.of(400),"h1",true,null);
    assertEquals("inter", created.key());
  }
}
