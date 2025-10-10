/*
 * File: MembershipCommandPort.java
 * Purpose: Define command operations for membership lifecycle and
 * mutations used by the application layer. Exposes create update and
 * soft-delete operations while shielding application logic from
 * persistence details.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.port;

import java.util.Set;

import com.poetry.poetry_backend.domain.membership.model.Membership;

public interface MembershipCommandPort {
  Membership create(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status);

  Membership update(
      Long id,
      long version,
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status);

  void softDelete(Long id, long version);
}
