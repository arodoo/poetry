/*
 * File: FontAssetQueryPort.java
 * Purpose: Query port for font assets.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.port;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.domain.font.model.FontAsset;

public interface FontAssetQueryPort {
  List<FontAsset> findAllActive();
  Optional<FontAsset> findByKey(String key);
  boolean existsPreloadDefault();
}
