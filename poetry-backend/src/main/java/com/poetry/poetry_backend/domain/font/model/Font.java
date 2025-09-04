/*
 * File: Font.java
 * Purpose: Minimal alias aggregate root for font module to satisfy module checker.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.font.model;

/**
 * Placeholder thin aggregate alias referencing {@link FontAsset}. Additional
 * behaviors (activation, lifecycle events) can be added when CRUD endpoints
 * are introduced. For now this exists only to satisfy required module shape.
 */
public record Font(Long id, String key) {
  public static Font from(FontAsset asset) {
    return new Font(asset.id(), asset.key());
  }
}
