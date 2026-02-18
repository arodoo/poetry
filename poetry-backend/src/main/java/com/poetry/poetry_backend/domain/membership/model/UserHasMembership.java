/*
 * File: UserHasMembership.java
 * Purpose: Immutable record representing a user's membership assignment
 * for a specific time period. Includes start/end dates for audit history
 * tracking of subscription ownership over time.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.membership.model;

import java.time.Instant;
import java.util.Set;

public record UserHasMembership(
    Long id,
    Long userId,
    Long subscriptionId,
    String sellerCode,
    Set<Long> zoneIds,
    Boolean allZones,
    Instant startDate,
    Instant endDate,
    String status,
    Instant createdAt,
    Instant updatedAt,
    long version) {

  public boolean isActive() {
    return "active".equals(status) && endDate.isAfter(Instant.now());
  }

  public boolean isExpired() {
    return endDate.isBefore(Instant.now());
  }
}
