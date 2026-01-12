/*
 * File: StatisticController.java
 * Purpose: REST controller exposing statistics endpoints for admin
 * dashboard. Provides membership counts by status.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.statistics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.statistics.usecase.GetMembershipStatsUseCase;
import com.poetry.poetry_backend.domain.statistics.model.MembershipStats;

@RestController
@RequestMapping("${app.api-base-path}/statistics")
public class StatisticController {
  private final GetMembershipStatsUseCase getMembershipStats;

  public StatisticController(GetMembershipStatsUseCase getMembershipStats) {
    this.getMembershipStats = getMembershipStats;
  }

  @GetMapping("/memberships")
  public ResponseEntity<MembershipStatsResponse> getMembershipStats(
      @RequestParam(defaultValue = "7") int expiringDays) {
    MembershipStats stats = getMembershipStats.execute(expiringDays);
    return ResponseEntity.ok(MembershipStatsResponse.from(stats));
  }
}
