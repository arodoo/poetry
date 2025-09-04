/*
 * File: FontAsset.java
 * Purpose: Domain model representing a font asset available for UI tokens.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.font.model;

import java.util.List;

public record FontAsset(
    Long id,
    String key,
    String label,
    String woff2Url,
    List<Integer> weights,
    String hash,
    boolean preloadDefault,
    boolean active,
    String integrity) {
  public FontAsset {
    if (key == null || key.isBlank()) {
      throw new IllegalArgumentException("font.key.missing");
    }
    if (label == null || label.isBlank()) {
      throw new IllegalArgumentException("font.label.missing");
    }
    if (woff2Url == null || woff2Url.isBlank()) {
      throw new IllegalArgumentException("font.url.missing");
    }
    if (hash == null || hash.isBlank()) {
      throw new IllegalArgumentException("font.hash.missing");
    }
  }

  public static FontAsset createNew(String key, String label, String url, List<Integer> weights,
      String hash, boolean preloadDefault, String integrity) {
    return new FontAsset(null, key, label, url, weights, hash, preloadDefault, true, integrity);
  }
}
