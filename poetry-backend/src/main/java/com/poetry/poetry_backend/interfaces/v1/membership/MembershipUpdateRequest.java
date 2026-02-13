/*
 * File: MembershipUpdateRequest.java
 * Purpose: DTO for membership update request. Allows updating
 * user, subscription, seller code, zones, and status.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Membership update request")
public record MembershipUpdateRequest(
        @Schema(description = "User ID", example = "5") Long userId,
        @Schema(description = "Subscription ID", example = "2") Long subscriptionId,
        @Schema(description = "Seller code", example = "SC-2024-001") String sellerCode,
        @Schema(description = "Zone IDs", example = "[1, 3, 5]") Set<Long> zoneIds,
        @Schema(description = "All zones flag", example = "false") Boolean allZones,
        @Schema(description = "Status", example = "active") String status) {
}
