/*
 * File: Membership.java
 * Purpose: Immutable record storing membership aggregate state linking
 * users to subscription plans through validated seller codes and zones.
 * Validation and mutation logic delegated to services per DDD patterns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.membership.model;

import java.time.Instant;
import java.util.Set;

public record Membership(
    Long id,
    Long userId,
    Long subscriptionId,
    String sellerCode,
    Set<Long> zoneIds,
    Boolean allZones,
    String status,
    Instant createdAt,
    Instant updatedAt,
    Instant deletedAt,
    long version) {
  public boolean isDeleted() {
    return deletedAt != null;
  }
}
