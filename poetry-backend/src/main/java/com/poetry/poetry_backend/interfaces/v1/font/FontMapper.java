/*
 * File: FontMapper.java
 * Purpose: Map Font domain objects to DTO responses.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import com.poetry.poetry_backend.domain.font.model.FontAsset;

final class FontMapper {
  private FontMapper() {}
  static FontDtos.FontResponse toDto(FontAsset font) {
    return new FontDtos.FontResponse(
        font.key(),
        font.label(),
        font.woff2Url(),
        font.weights(),
        font.hash(),
        font.preloadDefault(),
        font.active(),
        font.integrity());
  }
}
