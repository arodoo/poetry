/*
 * File: ZoneTest.java
 * Purpose: Domain model tests for Zone aggregate.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.zone.model;

import static org.junit.jupiter.api.Assertions.*;

import java.time.Instant;

import org.junit.jupiter.api.Test;

class ZoneTest {
  @Test
  void zoneCanBeCreated() {
    Zone zone =
        ZoneRehydrator.rehydrate(
            1L,
            "Main Store",
            "Primary retail zone",
            42L,
            Instant.now(),
            Instant.now(),
            null,
            0L);
    assertNotNull(zone);
    assertEquals(1L, zone.id());
    assertEquals("Main Store", zone.name());
    assertEquals("Primary retail zone", zone.description());
    assertEquals(42L, zone.managerId());
    assertFalse(zone.isDeleted());
  }

  @Test
  void zoneSoftDeletedWhenDeletedAtSet() {
    Instant now = Instant.now();
    Zone zone =
        ZoneRehydrator.rehydrate(
            1L, "Store", "Description", 42L, now, now, now, 0L);
    assertTrue(zone.isDeleted());
  }
}
