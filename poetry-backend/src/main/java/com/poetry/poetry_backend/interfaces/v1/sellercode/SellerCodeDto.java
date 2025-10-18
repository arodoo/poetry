/*
 * File: SellerCodeDto.java
 * Purpose: DTO classes for seller code endpoints. Provides request and
 * response records for seller code API operations ensuring clean separation
 * between API layer and domain model.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.sellercode;

import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

import io.swagger.v3.oas.annotations.media.Schema;

public final class SellerCodeDto {
  @Schema(description = "Seller code response")
  public record SellerCodeResponse(Long id, String code, String organizationId,
      Long userId, String status, long version) {}

  @Schema(description = "Create seller code request")
  public record SellerCodeCreateRequest(String code, String organizationId,
      Long userId, String status) {}

  @Schema(description = "Update seller code request")
  public record SellerCodeUpdateRequest(String code, String organizationId,
      Long userId, String status) {}

  public static SellerCodeResponse toResponse(SellerCode sc) {
    return new SellerCodeResponse(sc.id(), sc.code(), sc.organizationId(),
        sc.userId(), sc.status(), sc.version());
  }
}
