/*
 * File: FingerprintTest.java
 * Purpose: Domain model tests for Fingerprint aggregate validating
 * business invariants and state transitions.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class FingerprintTest {
  @Test
  void shouldCreateValidFingerprint() {
    var fingerprint = FingerprintFactory.createNew(1L, "validTemplateData");
    
    assertNotNull(fingerprint);
    assertEquals(1L, fingerprint.userId());
    assertTrue(fingerprint.isActive());
  }
}
