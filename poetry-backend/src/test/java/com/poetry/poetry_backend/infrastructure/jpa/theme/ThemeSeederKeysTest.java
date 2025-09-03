/*
 * File: ThemeSeederKeysTest.java
 * Purpose: Ensure seeding uses expected stable theme keys ordering.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class ThemeSeederKeysTest {
  @Test
  void defaultThemeKeysMatchExpectation() {
    String[] rows = ThemeConstants.DEFAULT_THEMES;
    List<String> keys = java.util.Arrays.stream(rows)
        .map(r -> r.split("\\|")[0]).toList();
    // Snapshot of first and last keys only to avoid brittle full list coupling.
    assertEquals("default", keys.get(0));
    assertEquals("mono", keys.get(keys.size()-1));
    // Ensure uniqueness size.
    assertEquals(keys.size(), keys.stream().distinct().count());
  }
}
