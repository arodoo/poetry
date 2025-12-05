/*
 * File: UserTest.java
 * Purpose: Validate happy path creation of the User aggregate using the
 * factory to ensure invariants are enforced.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.domain.user.model.core.UserFactory;

class UserTest {
  @Test
  void factoryCreatesActiveUserWithCanonicalData() {
    var user = UserFactory.createNew(
        "Ada",
        "Lovelace",
        "ada@example.com",
        "ada",
        "en",
        Set.of("admin"));

    assertEquals("Ada", user.firstName());
    assertEquals("ada@example.com", user.email());
    assertEquals("active", user.status());
  }
}
