/*
 * File: FontTest.java
 * Purpose: Minimal test for Font aggregate placeholder.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.font.model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class FontTest {
  @Test
  void fromMapsIdAndKey() {
    FontAsset asset = FontAsset.createNew(
      "inter",
      "Inter",
      "inter.woff2",
      List.of(400),
      "h1",
      true,
      null
    );
    Font f = Font.from(asset);
    assertEquals(asset.key(), f.key());
  }
}
