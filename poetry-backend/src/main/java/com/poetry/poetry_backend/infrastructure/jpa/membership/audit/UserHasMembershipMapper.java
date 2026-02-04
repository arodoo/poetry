/*
 * File: UserHasMembershipMapper.java
 * Purpose: Maps between UserHasMembershipEntity and UserHasMembership
 * domain record. Handles zone IDs collection separately.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.membership.audit;

import java.util.Set;

import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;

public final class UserHasMembershipMapper {
  private UserHasMembershipMapper() {
  }

  public static UserHasMembership toDomain(
      UserHasMembershipEntity e,
      Set<Long> zoneIds,
      java.time.Instant now,
      java.time.Instant expiringLimit) {
    String status = e.getStatus();
    if (e.getEndDate() != null && now != null) {
      if (e.getEndDate().isBefore(now)) {
        status = "EXPIRED";
      } else if (expiringLimit != null && e.getEndDate().isBefore(expiringLimit)) {
        status = "EXPIRING";
      }
    }
    return new UserHasMembership(
        e.getId(),
        e.getUserId(),
        e.getSubscriptionId(),
        e.getSellerCode(),
        zoneIds,
        e.getStartDate(),
        e.getEndDate(),
        status,
        e.getCreatedAt(),
        e.getUpdatedAt(),
        e.getVersion() != null ? e.getVersion() : 0L);
  }

  public static void toEntity(
      UserHasMembership m,
      UserHasMembershipEntity e) {
    e.setUserId(m.userId());
    e.setSubscriptionId(m.subscriptionId());
    e.setSellerCode(m.sellerCode());
    e.setStartDate(m.startDate());
    e.setEndDate(m.endDate());
    e.setStatus(m.status());
  }
}
