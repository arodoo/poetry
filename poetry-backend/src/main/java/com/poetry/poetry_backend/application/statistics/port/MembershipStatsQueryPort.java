/*
 * File: MembershipStatsQueryPort.java
 * Purpose: Query port for retrieving membership statistics from
 * persistence layer. Defines read-only operations for dashboard.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.statistics.port;

import com.poetry.poetry_backend.domain.statistics.model.MembershipStats;

public interface MembershipStatsQueryPort {
  MembershipStats getMembershipStats(int expiringDaysThreshold);
}
