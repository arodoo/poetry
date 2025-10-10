/*
 * File: MembershipJpaMapper.java
 * Purpose: Mapping helper to convert JPA MembershipEntity instances to
 * domain Membership models. Isolates mapping logic from adapters so
 * adapters remain focused on repository interactions and wiring.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.domain.membership.model.MembershipRehydrator;

public final class MembershipJpaMapper {
  private MembershipJpaMapper() {}

  public static Membership toDomain(MembershipEntity e) {
    return MembershipRehydrator.rehydrate(
        e.getId(),
        e.getUserId(),
        e.getSubscriptionId(),
        e.getSellerCode(),
        e.getZoneIds(),
        e.getAllZones(),
        e.getStatus(),
        e.getCreatedAt(),
        e.getUpdatedAt(),
        e.getDeletedAt(),
        e.getVersion() == null ? 0L : e.getVersion());
  }
}
