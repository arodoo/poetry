/*
 * File: UserMembershipZonesRepository.java
 * Purpose: JPA repository for user_membership_zones junction table.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.membership.audit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserMembershipZonesRepository
    extends JpaRepository<UserMembershipZonesEntity, Long> {

  @Query("SELECT z.zoneId FROM UserMembershipZonesEntity z "
      + "WHERE z.membershipId = :membershipId")
  List<Long> findZoneIdsByMembershipId(Long membershipId);

  void deleteByMembershipId(Long membershipId);
}
