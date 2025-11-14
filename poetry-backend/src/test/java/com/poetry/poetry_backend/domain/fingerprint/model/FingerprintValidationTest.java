/*
 * File: FingerprintValidationTest.java
 * Purpose: Tests for FingerprintValidator ensuring domain rules enforcement
 * on R503 slot ID range and user association requirements.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class FingerprintValidationTest {
  @Test
  void shouldRejectNullUserId() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateEnrollment(null, 45);
    });
  }
  
  @Test
  void shouldRejectNullSlotId() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateEnrollment(1L, null);
    });
  }
  
  @Test
  void shouldRejectSlotIdOutOfRange() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateEnrollment(1L, 1500);
    });
  }
}
