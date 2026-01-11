/*
 * File: MembershipStatsResponse.java
 * Purpose: DTO for membership statistics REST response with counts
 * for active, expiring soon, expired and total memberships.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.statistics;

import com.poetry.poetry_backend.domain.statistics.model.MembershipStats;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Membership statistics response")
public record MembershipStatsResponse(
    @Schema(description = "Active memberships", example = "150")
    long active,
    @Schema(description = "Expiring within threshold days", example = "12")
    long expiringSoon,
    @Schema(description = "Expired memberships", example = "25")
    long expired,
    @Schema(description = "Total memberships", example = "187")
    long total) {

  public static MembershipStatsResponse from(MembershipStats s) {
    return new MembershipStatsResponse(
        s.activeCount(), s.expiringSoonCount(), s.expiredCount(), s.totalCount());
  }
}
