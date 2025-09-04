/*
 * File: FontCommandPort.java
 * Purpose: Port for mutating font assets (module shape compliance).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.port;

import com.poetry.poetry_backend.domain.font.model.FontAsset;

public interface FontCommandPort {
  FontAsset save(FontAsset asset);
  void deleteSoft(Long id);
}
