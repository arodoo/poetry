/*
 * File: SubscriptionTest.java
 * Purpose: Unit tests for Subscription domain entity verifying happy-path
 * behaviors and field validations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.subscription.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

import org.junit.jupiter.api.Test;

class SubscriptionTest {
  @Test
  void instantiateSubscription() {
    Subscription s = new Subscription(
        1L,
        "basic",
        "Basic plan",
        BigDecimal.valueOf(0),
        "USD",
        30,
        Set.of(),
        "active",
        Instant.now(),
        Instant.now(),
        null,
        0L);
    assert s != null;
    assert !s.isDeleted();
  }
}
