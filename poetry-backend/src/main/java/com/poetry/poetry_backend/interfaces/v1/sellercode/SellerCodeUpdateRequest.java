/*
 * File: SellerCodeUpdateRequest.java
 * Purpose: Request DTO for updating an existing seller code. Captures
 * modifiable fields such as code, organization, user, and status for
 * processing updates.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.sellercode;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Update seller code request")
public record SellerCodeUpdateRequest(
        @Schema(description = "Unique code", example = "SC-2024-001") String code,
        @Schema(description = "User ID", example = "5") Long userId,
        @Schema(description = "Status", example = "ACTIVE") String status) {
}
