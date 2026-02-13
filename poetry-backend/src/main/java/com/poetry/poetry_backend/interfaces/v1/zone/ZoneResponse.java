/*
 * File: ZoneResponse.java
 * Purpose: Response DTO for zone data. Decouples internal domain
 * representation from API contract. Includes id, name, description,
 * manager, status, createdAt, and version.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import java.time.Instant;

import com.poetry.poetry_backend.domain.zone.model.Zone;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Zone response with all fields")
public record ZoneResponse(
        @Schema(description = "Unique identifier", example = "1") Long id,
        @Schema(description = "Zone name", example = "Main Store") String name,
        @Schema(description = "Zone description", example = "Primary retail zone") String description,
        @Schema(description = "Manager user ID", example = "42") Long managerId,
        @Schema(description = "Status", example = "active") String status,
        @Schema(description = "Creation date", example = "2023-01-01T00:00:00Z") Instant createdAt,
        @Schema(description = "Version for locking", example = "0") long version) {

    public static ZoneResponse fromDomain(Zone z) {
        return new ZoneResponse(
                z.id(),
                z.name(),
                z.description(),
                z.managerId(),
                z.status(),
                z.createdAt(),
                z.version());
    }
}
