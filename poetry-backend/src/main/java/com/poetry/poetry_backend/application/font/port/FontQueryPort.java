/*
 * File: FontQueryPort.java
 * Purpose: Port for querying font assets (module shape compliance).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.port;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.domain.font.model.FontAsset;

public interface FontQueryPort {
  List<FontAsset> findAll();
  Optional<FontAsset> findByKey(String key);
}
