/*
 * File: ThemeSeederKeysTest.java
 * Purpose: Ensure seeding uses expected stable theme keys ordering.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.infrastructure.jpa.theme.seeder.ThemeConstants;
import com.poetry.poetry_backend.infrastructure.jpa.theme.seeder.ThemeDefinition;

class ThemeSeederKeysTest {
  @Test
  void defaultThemeKeysMatchExpectation() {
    ThemeDefinition[] defs = ThemeConstants.DEFAULTS;
    List<String> keys = java.util.Arrays.stream(defs)
        .map(ThemeDefinition::key).toList();
    // Snapshot of first and last keys only to avoid brittle full list coupling.
    assertEquals("calm", keys.get(0));
    assertEquals("ink", keys.get(keys.size() - 1));
    // Ensure uniqueness size.
    assertEquals(keys.size(), keys.stream().distinct().count());
  }
}
