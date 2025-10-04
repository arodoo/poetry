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

public final class SellerCodeDtos {
  public record SellerCodeResponse(
      Long id,
      String code,
      String organizationId,
      Long userId,
      String status,
      long version) {}

  public record SellerCodeCreateRequest(
      String code, String organizationId, Long userId, String status) {}

  public record SellerCodeUpdateRequest(
      String code, String organizationId, Long userId, String status) {}

  public static SellerCodeResponse toResponse(SellerCode sc) {
    return new SellerCodeResponse(
        sc.id(), sc.code(), sc.organizationId(), sc.userId(), sc.status(), sc.version());
  }
}
