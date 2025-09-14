/*
 * File: AuthTest.java
 * Purpose: Happy-path creation test for Auth domain model.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.auth.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class AuthTest {
  @Test void createsAuth() {
    var a = new Auth("id1", "user", false);
    assertEquals("id1", a.id());
    assertEquals("user", a.username());
  }
}
