/*
 * File: UserTest.java
 * Purpose: Placeholder domain test for User aggregate.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import org.junit.jupiter.api.Test;

class UserTest {
  @Test
  void createsUser() {
    var u = new User(1L, "F", "L", "e@example.com", "user", true, Set.of("ROLE_USER"));
    assertEquals("F", u.getFirstName());
    assertTrue(u.isActive());
  }
}
