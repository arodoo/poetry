/*
 * File: FingerprintTest.java
 * Purpose: Domain model tests for Fingerprint aggregate validating
 * business invariants and R503 slot assignment.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class FingerprintTest {
  @Test
  void shouldCreateValidFingerprint() {
    var fingerprint = FingerprintFactory.createNew(1L, 45);
    
    assertNotNull(fingerprint);
    assertEquals(1L, fingerprint.userId());
    assertEquals(45, fingerprint.r503SlotId());
    assertTrue(fingerprint.isActive());
    assertTrue(fingerprint.canVerify());
  }
}
