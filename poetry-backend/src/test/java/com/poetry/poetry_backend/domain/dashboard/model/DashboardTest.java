/*
 * File: DashboardTest.java
 * Purpose: Validate Dashboard aggregate invariants and happy path.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class DashboardTest {
  @Test
  void createsValidDashboard() {
    Dashboard dashboard = new Dashboard(1L, "Main", "main-dashboard", "desc", null);
    assertEquals("main-dashboard", dashboard.slug());
  }

  @Test
  void blankNameShouldFail() {
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
        new Dashboard(1L, " ", "main-dashboard", null, null));
    assertEquals("dashboard.name.blank", exception.getMessage());
  }

  @Test
  void invalidSlugPatternShouldFail() {
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
        new Dashboard(1L, "Main", "INVALID", null, null));
    assertEquals("dashboard.slug.invalid", exception.getMessage());
  }
}
