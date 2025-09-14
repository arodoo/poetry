/*
 * File: AuthValidationTest.java
 * Purpose: Validates error keys for invalid Auth construction.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.auth.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class AuthValidationTest {
  @Test void givenBlankIdShouldFail() {
    var ex = assertThrows(IllegalArgumentException.class,
        () -> new Auth(" ", "u", false));
    assertEquals("auth.id.blank", ex.getMessage());
  }

  @Test void givenBlankUsernameShouldFail() {
    var ex = assertThrows(IllegalArgumentException.class,
        () -> new Auth("id", "", false));
    assertEquals("auth.username.blank", ex.getMessage());
  }
}
