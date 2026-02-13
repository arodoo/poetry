/*
 * File: MembershipCreateRequest.java
 * Purpose: DTO for membership creation request. Captures userId,
 * subscriptionId, sellerCode, zones, and status from the client.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Membership creation request")
public record MembershipCreateRequest(
        @Schema(description = "User ID", example = "5", requiredMode = Schema.RequiredMode.REQUIRED) Long userId,
        @Schema(description = "Subscription ID", example = "2", requiredMode = Schema.RequiredMode.REQUIRED) Long subscriptionId,
        @Schema(description = "Seller code", example = "SC-2024-001", requiredMode = Schema.RequiredMode.REQUIRED) String sellerCode,
        @Schema(description = "Zone IDs", example = "[1, 3, 5]") Set<Long> zoneIds,
        @Schema(description = "All zones flag", example = "false") Boolean allZones,
        @Schema(description = "Status", example = "active") String status) {
}
