/*
 * File: MembershipRehydrator.java
 * Purpose: Rebuild Membership aggregates from persisted data while
 * reapplying default values for status and handling null collections.
 * Keeps factory logic modular to respect file length policies.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.membership.model;

import java.time.Instant;
import java.util.Set;

public final class MembershipRehydrator {
  private MembershipRehydrator() { }

  public static Membership rehydrate(
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
    return new Membership(
        id,
        userId,
        subscriptionId,
        sellerCode,
        zoneIds != null ? zoneIds : Set.of(),
        allZones != null ? allZones : false,
        status == null || status.isBlank() ? "active" : status,
        createdAt,
        updatedAt,
        deletedAt,
        version);
  }
}
