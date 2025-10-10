/*
 * File: SubscriptionRehydrator.java
 * Purpose: Rebuild Subscription aggregates from persisted data while
 * reapplying validation rules to guard against inconsistent records.
 * Keeps factory logic modular to respect file length policies.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.subscription.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

public final class SubscriptionRehydrator {
  private SubscriptionRehydrator() { }

  public static Subscription rehydrate(
      Long id,
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status,
      Instant createdAt,
      Instant updatedAt,
      Instant deletedAt,
      long version) {
    return new Subscription(
        id,
        name,
        description,
        price,
        currency,
        durationDays,
        features != null ? features : Set.of(),
        status == null || status.isBlank() ? "active" : status,
        createdAt,
        updatedAt,
        deletedAt,
        version);
  }
}
