/*
 * File: ZoneUpdateRequest.java
 * Purpose: Request DTO for updating an existing zone. Captures modifiable
 * fields such as name, description, manager, status, and version for
 * processing updates.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Update zone request payload")
public record ZoneUpdateRequest(
        @Schema(description = "Zone name", example = "Main Store") String name,
        @Schema(description = "Zone description", example = "Primary retail zone") String description,
        @Schema(description = "Manager user ID", example = "42") Long managerId,
        @Schema(description = "Status", example = "active") String status,
        @Schema(description = "Version for optimistic locking", example = "0") long version) {
}
