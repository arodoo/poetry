/*
 * File: SellerCodeResponse.java
 * Purpose: Response DTO for seller code data. Decouples internal domain
 * representation from API contract. Includes id, code, organization,
 * user, status, createdAt, and version.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.sellercode;

import java.time.Instant;

import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Seller code response")
public record SellerCodeResponse(
        @Schema(description = "Seller code ID", example = "1") Long id,
        @Schema(description = "Unique code", example = "SC-2024-001") String code,
        @Schema(description = "User ID", example = "5") Long userId,
        @Schema(description = "Status", example = "ACTIVE") String status,
        @Schema(description = "Creation date", example = "2023-01-01T00:00:00Z") Instant createdAt,
        @Schema(description = "Version for locking", example = "0") long version) {

    public static SellerCodeResponse fromDomain(SellerCode sc) {
        return new SellerCodeResponse(
                sc.id(),
                sc.code(),
                sc.userId(),
                sc.status(),
                sc.createdAt(),
                sc.version());
    }
}
