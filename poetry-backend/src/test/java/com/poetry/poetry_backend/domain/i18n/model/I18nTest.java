/*
 * File: I18nTest.java
 * Purpose: Tests for I18n aggregate basic invariants. This test class
 * validates the behavior of the I18n domain model under various conditions.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.i18n.model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class I18nTest {
  @Test
  void createsWithDefaultInSupported() {
    assertDoesNotThrow(() -> I18n.of("en", List.of("en", "es")));
  }

  @Test
  void rejectsMissingDefault() {
    assertThrows(IllegalArgumentException.class, () -> I18n.of("", List.of("en")));
  }

  @Test
  void autoAddsDefaultWhenMissingFromSupported() {
    I18n i = I18n.of("fr", List.of("en"));
    assertTrue(i.supportedLocales().contains("fr"));
  }
}
