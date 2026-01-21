/*
 * File: UserHasMembershipQueryPort.java
 * Purpose: Query port for user_has_membership read operations.
 * Follows DDD pattern separating reads from writes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.membership.port;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;

public interface UserHasMembershipQueryPort {
  List<UserHasMembership> findByUserId(Long userId);

  Optional<UserHasMembership> findActiveByUserId(Long userId, Instant now);

  List<UserHasMembership> findExpiringSoon(Instant now, Instant limit);

  List<UserHasMembership> findExpired(Instant now);

  long countActive(Instant now);

  long countExpired(Instant now);

  Page<UserHasMembership> findAllActive(Instant now, Pageable pageable);

  Page<UserHasMembership> findAllExpiring(Instant now, Instant limit,
      Pageable pageable);

  Page<UserHasMembership> findAllExpired(Instant now, Pageable pageable);
}
