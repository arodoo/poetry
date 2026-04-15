/*
 * File: SellerCodeCreateRequest.java
 * Purpose: Request DTO for creating a new seller code. Captures code,
 * organization, user, and status fields for validation and processing.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.sellercode;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Create seller code request")
public record SellerCodeCreateRequest(
        @NotBlank @Schema(description = "Unique code", example = "SC-2024-001") String code,
        @Schema(description = "Organization ID (optional)", example = "ORG-123") String organizationId,
        @NotNull @Schema(description = "User ID", example = "5") Long userId,
        @NotBlank @Schema(description = "Status", example = "ACTIVE") String status) {
}
