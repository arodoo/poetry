/*
 * File: ZoneDtos.java
 * Purpose: DTO classes for zone endpoints representing request and
 * response payloads independently from domain model. Using DTOs
 * ensures clear API contracts enables versioning and validation at
 * the boundary layer maintaining clean separation between interface
 * and domain concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import com.poetry.poetry_backend.domain.zone.model.Zone;

import io.swagger.v3.oas.annotations.media.Schema;

public final class ZoneDtos {
  @Schema(description = "Zone response with all fields")
  public record ZoneResponse(
      @Schema(description = "Unique identifier", example = "1")
      Long id,
      @Schema(description = "Zone name", example = "Main Store")
      String name,
      @Schema(description = "Zone description", example = "Primary retail zone")
      String description,
      @Schema(description = "Manager user ID", example = "42")
      Long managerId,
      @Schema(description = "Version for locking", example = "0")
      long version) {}

  @Schema(description = "Create zone request payload")
  public record ZoneCreateRequest(
      @Schema(description = "Zone name", example = "Main Store")
      String name,
      @Schema(description = "Zone description", example = "Primary retail zone")
      String description,
      @Schema(description = "Manager user ID", example = "42")
      Long managerId) {}

  @Schema(description = "Update zone request payload")
  public record ZoneUpdateRequest(
      @Schema(description = "Zone name", example = "Main Store")
      String name,
      @Schema(description = "Zone description", example = "Primary retail zone")
      String description,
      @Schema(description = "Manager user ID", example = "42")
      Long managerId,
      @Schema(description = "Version for optimistic locking", example = "0")
      long version) {}

  public static ZoneResponse toResponse(Zone z) {
    return new ZoneResponse(
        z.id(), z.name(), z.description(), z.managerId(), z.version());
  }
}
