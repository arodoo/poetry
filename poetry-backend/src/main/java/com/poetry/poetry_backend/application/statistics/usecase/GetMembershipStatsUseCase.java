/*
 * File: GetMembershipStatsUseCase.java
 * Purpose: Orchestrates retrieval of membership statistics from port.
 * Provides default threshold of 7 days for expiring soon count.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.statistics.usecase;

import com.poetry.poetry_backend.application.statistics.port.MembershipStatsQueryPort;
import com.poetry.poetry_backend.domain.statistics.model.MembershipStats;

public class GetMembershipStatsUseCase {
  private static final int DEFAULT_EXPIRING_DAYS = 7;
  private final MembershipStatsQueryPort port;

  public GetMembershipStatsUseCase(MembershipStatsQueryPort port) {
    this.port = port;
  }

  public MembershipStats execute() {
    return port.getMembershipStats(DEFAULT_EXPIRING_DAYS);
  }

  public MembershipStats execute(int expiringDays) {
    return port.getMembershipStats(expiringDays);
  }
}
