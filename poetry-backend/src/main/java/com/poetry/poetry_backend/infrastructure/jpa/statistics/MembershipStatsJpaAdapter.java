/*
 * File: MembershipStatsJpaAdapter.java
 * Purpose: JPA adapter implementing statistics port by querying
 * user_has_membership table for active, expiring and expired counts.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.statistics;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Repository;

import com.poetry.poetry_backend.application.statistics.port.MembershipStatsQueryPort;
import com.poetry.poetry_backend.domain.statistics.model.MembershipStats;
import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.*;

@Repository
public class MembershipStatsJpaAdapter implements MembershipStatsQueryPort {
  private final UserHasMembershipJpaRepository repo;

  public MembershipStatsJpaAdapter(UserHasMembershipJpaRepository repo) {
    this.repo = repo;
  }

  @Override
  public MembershipStats getMembershipStats(int expiringDays) {
    Instant now = Instant.now();
    Instant limit = now.plus(expiringDays, ChronoUnit.DAYS);
    long active = repo.countActive(now);
    long expiring = repo.findExpiringSoon(now, limit).size();
    long expired = repo.countExpired(now);
    return MembershipStats.of(active, expiring, expired);
  }
}
