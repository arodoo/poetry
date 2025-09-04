/*
 * File: FontAssetCommandPort.java
 * Purpose: Command port for font asset persistence.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.port;

import com.poetry.poetry_backend.domain.font.model.FontAsset;

public interface FontAssetCommandPort {
  FontAsset save(FontAsset asset);
}
