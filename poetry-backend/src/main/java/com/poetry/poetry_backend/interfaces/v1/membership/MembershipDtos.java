/*
 * File: MembershipDtos.java
 * Purpose: DTO classes for membership endpoints representing request and
 * response payloads independently from domain model. Enables clear API
 * contracts and versioning at the boundary.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import java.util.Set;

import com.poetry.poetry_backend.domain.membership.model.Membership;

import io.swagger.v3.oas.annotations.media.Schema;

public final class MembershipDtos {
  @Schema(description = "Membership response representation")
  public record MembershipResponse(
      @Schema(description = "Membership ID", example = "1")
      Long id,
      @Schema(description = "User ID", example = "5")
      Long userId,
      @Schema(description = "Subscription ID", example = "2")
      Long subscriptionId,
      @Schema(description = "Seller code", example = "SC-2024-001")
      String sellerCode,
      @Schema(description = "Zone IDs", example = "[1, 3, 5]")
      Set<Long> zoneIds,
      @Schema(description = "All zones flag", example = "false")
      Boolean allZones,
      @Schema(description = "Status", example = "active")
      String status,
      @Schema(description = "Version for locking", example = "0")
      long version) { }

  @Schema(description = "Membership creation request")
  public record MembershipCreateRequest(
      @Schema(description = "User ID", example = "5",
          requiredMode = Schema.RequiredMode.REQUIRED)
      Long userId,
      @Schema(description = "Subscription ID", example = "2",
          requiredMode = Schema.RequiredMode.REQUIRED)
      Long subscriptionId,
      @Schema(description = "Seller code", example = "SC-2024-001",
          requiredMode = Schema.RequiredMode.REQUIRED)
      String sellerCode,
      @Schema(description = "Zone IDs", example = "[1, 3, 5]")
      Set<Long> zoneIds,
      @Schema(description = "All zones flag", example = "false")
      Boolean allZones,
      @Schema(description = "Status", example = "active")
      String status) { }

  @Schema(description = "Membership update request")
  public record MembershipUpdateRequest(
      @Schema(description = "User ID", example = "5")
      Long userId,
      @Schema(description = "Subscription ID", example = "2")
      Long subscriptionId,
      @Schema(description = "Seller code", example = "SC-2024-001")
      String sellerCode,
      @Schema(description = "Zone IDs", example = "[1, 3, 5]")
      Set<Long> zoneIds,
      @Schema(description = "All zones flag", example = "false")
      Boolean allZones,
      @Schema(description = "Status", example = "active")
      String status) { }

  public static MembershipResponse toResponse(Membership m) {
    return new MembershipResponse(
        m.id(),
        m.userId(),
        m.subscriptionId(),
        m.sellerCode(),
        m.zoneIds(),
        m.allZones(),
        m.status(),
        m.version());
  }
}
