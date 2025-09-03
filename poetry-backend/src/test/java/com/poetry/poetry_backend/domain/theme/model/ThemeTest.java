/*
 * File: ThemeTest.java
 * Purpose: Minimal domain test placeholder to satisfy blueprint.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

import org.junit.jupiter.api.Test;

class ThemeTest {
  @Test
  void createNew_valid() {
    var t = Theme.createNew("Name", Map.of("primary","#fff"));
    assertNull(t.getId());
    assertEquals("Name", t.getName());
    assertFalse(t.isActive());
  }
}
