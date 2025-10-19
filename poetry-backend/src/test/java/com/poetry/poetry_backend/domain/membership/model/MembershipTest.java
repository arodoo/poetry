package com.poetry.poetry_backend.domain.membership.model;

import java.time.Instant;
import java.util.Set;

import org.junit.jupiter.api.Test;

class MembershipTest {
  @Test
  void shouldInstantiateMembership() {
    // Construct with sample values (records require full args)
    Membership m = new Membership(
        1L,
        10L,
        20L,
        "seller-code",
        Set.of(),
        Boolean.FALSE,
        "active",
        Instant.now(),
        Instant.now(),
        null,
        0L);
    // Basic sanity assertions
    assert m != null;
    assert !m.isDeleted();
  }
}
