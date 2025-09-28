/*
 * File: DashboardValidationTest.java
 * Purpose: Cover negative validation paths for Dashboard aggregate.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class DashboardValidationTest {
  @Test
  void blankSlugFails() {
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
        new Dashboard(1L, "Main", " ", null, null));
    assertEquals("dashboard.slug.blank", exception.getMessage());
  }

  @Test
  void tooLongDescriptionFails() {
    String longText = "x".repeat(161);
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
        new Dashboard(1L, "Main", "main-dashboard", longText, null));
    assertEquals("dashboard.description.tooLong", exception.getMessage());
  }
}
