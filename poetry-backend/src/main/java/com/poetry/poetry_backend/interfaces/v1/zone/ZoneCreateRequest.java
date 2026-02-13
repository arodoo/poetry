/*
 * File: ZoneCreateRequest.java
 * Purpose: Request DTO for creating a new zone. Captures name,
 * description, and manager fields for validation and processing.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Create zone request payload")
public record ZoneCreateRequest(
        @NotBlank @Schema(description = "Zone name", example = "Main Store") String name,
        @Schema(description = "Zone description", example = "Primary retail zone") String description,
        @NotNull @Schema(description = "Manager user ID", example = "42") Long managerId) {
}
