/*
 * File: SellerCodeDtos.java
 * Purpose: DTO classes for seller code endpoints representing request and
 * response payloads independently from domain model. Using DTOs ensures clear
 * API contracts enables versioning and validation at the boundary layer
 * maintaining clean separation between interface and domain concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.sellercode;

import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

import io.swagger.v3.oas.annotations.media.Schema;

public final class SellerCodeDtos {
  @Schema(description = "Seller code response with all fields")
  public record SellerCodeResponse(
      @Schema(description = "Unique identifier", example = "1")
      Long id,
      @Schema(description = "Seller code", example = "ADMIN-SC-001")
      String code,
      @Schema(description = "Organization ID", example = "default-org")
      String organizationId,
      @Schema(description = "User ID owner", example = "1")
      Long userId,
      @Schema(description = "Status", example = "active")
      String status,
      @Schema(description = "Version for locking", example = "0")
      long version) {}

  @Schema(description = "Create seller code request payload")
  public record SellerCodeCreateRequest(
      @Schema(description = "Seller code", example = "SC-2024-001")
      String code,
      @Schema(description = "Organization ID", example = "default-org")
      String organizationId,
      @Schema(description = "User ID owner", example = "1")
      Long userId,
      @Schema(description = "Initial status", example = "active")
      String status) {}

  @Schema(description = "Update seller code request payload")
  public record SellerCodeUpdateRequest(
      @Schema(description = "Seller code", example = "SC-2024-001")
      String code,
      @Schema(description = "Organization ID", example = "default-org")
      String organizationId,
      @Schema(description = "User ID owner", example = "1")
      Long userId,
      @Schema(description = "Current status", example = "active")
      String status) {}

  public static SellerCodeResponse toResponse(SellerCode sc) {
    return new SellerCodeResponse(
        sc.id(), sc.code(), sc.organizationId(), sc.userId(),
        sc.status(), sc.version());
  }
}
