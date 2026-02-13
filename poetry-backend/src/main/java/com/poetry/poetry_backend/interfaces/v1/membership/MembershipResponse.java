/*
 * File: MembershipResponse.java
 * Purpose: Response DTO for membership data. Decouples internal domain
 * representation from API contract. Includes id, user, subscription,
 * seller code, zones, status, createdAt and version.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import java.time.Instant;
import java.util.Set;

import com.poetry.poetry_backend.domain.membership.model.Membership;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Membership response representation")
public record MembershipResponse(
        @Schema(description = "Membership ID", example = "1") Long id,
        @Schema(description = "User ID", example = "5") Long userId,
        @Schema(description = "Subscription ID", example = "2") Long subscriptionId,
        @Schema(description = "Seller code", example = "SC-2024-001") String sellerCode,
        @Schema(description = "Zone IDs", example = "[1, 3, 5]") Set<Long> zoneIds,
        @Schema(description = "All zones flag", example = "false") Boolean allZones,
        @Schema(description = "Status", example = "active") String status,
        @Schema(description = "Creation date", example = "2023-01-01T00:00:00Z") Instant createdAt,
        @Schema(description = "Version for locking", example = "0") long version) {

    public static MembershipResponse fromDomain(Membership m) {
        return new MembershipResponse(
                m.id(),
                m.userId(),
                m.subscriptionId(),
                m.sellerCode(),
                m.zoneIds(),
                m.allZones(),
                m.status(),
                m.createdAt(),
                m.version());
    }
}
