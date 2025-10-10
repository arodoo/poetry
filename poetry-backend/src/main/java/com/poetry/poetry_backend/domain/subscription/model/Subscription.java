/*
 * File: Subscription.java
 * Purpose: Immutable record storing subscription plan aggregate state
 * representing different tiers (silver, gold, platinum, etc) with pricing
 * and feature sets. Validation and mutation logic delegated to services.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.subscription.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

public record Subscription(
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
  public boolean isDeleted() {
    return deletedAt != null;
  }
}
