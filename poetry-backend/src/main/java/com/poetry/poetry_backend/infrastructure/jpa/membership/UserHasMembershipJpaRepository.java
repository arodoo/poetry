/*
 * File: UserHasMembershipJpaRepository.java
 * Purpose: JPA repository for user_has_membership persistence with
 * queries for active, expiring, expired and historical memberships.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.membership;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserHasMembershipJpaRepository
    extends JpaRepository<UserHasMembershipEntity, Long> {

  @Query("SELECT m FROM UserHasMembershipEntity m "
      + "WHERE m.userId = :userId ORDER BY m.startDate DESC")
  List<UserHasMembershipEntity> findByUserId(Long userId);

  @Query("SELECT m FROM UserHasMembershipEntity m "
      + "WHERE m.userId = :userId AND m.endDate > :now AND m.status = 'active'")
  Optional<UserHasMembershipEntity> findActiveByUserId(Long userId, Instant now);

  @Query("SELECT m FROM UserHasMembershipEntity m "
      + "WHERE m.endDate BETWEEN :now AND :limit AND m.status = 'active'")
  List<UserHasMembershipEntity> findExpiringSoon(Instant now, Instant limit);

  @Query("SELECT m FROM UserHasMembershipEntity m "
      + "WHERE m.endDate < :now AND m.status = 'active'")
  List<UserHasMembershipEntity> findExpired(Instant now);

  @Query("SELECT COUNT(m) FROM UserHasMembershipEntity m "
      + "WHERE m.endDate > :now AND m.status = 'active'")
  long countActive(Instant now);

  @Query("SELECT COUNT(m) FROM UserHasMembershipEntity m "
      + "WHERE m.endDate < :now AND m.status = 'active'")
  long countExpired(Instant now);
}
