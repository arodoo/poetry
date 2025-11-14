/*
 * File: FingerprintValidationTest.java
 * Purpose: Tests for FingerprintValidator ensuring domain rules enforcement
 * on template data format and user association requirements.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class FingerprintValidationTest {
  @Test
  void shouldRejectNullUserId() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateEnrollment(null, "templateData");
    });
  }
  
  @Test
  void shouldRejectBlankTemplate() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateEnrollment(1L, "");
    });
  }
}
