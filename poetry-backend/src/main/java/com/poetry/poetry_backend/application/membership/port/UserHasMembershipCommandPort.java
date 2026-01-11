/*
 * File: UserHasMembershipCommandPort.java
 * Purpose: Command port for user_has_membership write operations.
 * Separates write concerns from queries per CQRS pattern.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.membership.port;

import java.time.Instant;
import java.util.Set;

import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;

public interface UserHasMembershipCommandPort {
  UserHasMembership create(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Instant startDate,
      Instant endDate);

  UserHasMembership updateStatus(Long id, String status);
}
