/*
 * File: FingerprintValidationTest.java
 * Purpose: Tests for FingerprintValidator ensuring domain rules enforcement.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintValidator;

class FingerprintValidationTest {
  @Test
  void shouldRejectNullUserId() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateUserId(null);
    });
  }

  @Test
  void shouldRejectInvalidUserId() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateUserId(0L);
    });
  }

  @Test
  void shouldRejectNullFmd() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateFmd(null);
    });
  }

  @Test
  void shouldRejectEmptyFmd() {
    assertThrows(IllegalArgumentException.class, () -> {
      FingerprintValidator.validateFmd("");
    });
  }
}
