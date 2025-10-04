/*
 * File: SellerCodeJpaMapper.java
 * Purpose: Mapping helper to convert JPA SellerCodeEntity instances to domain
 * SellerCode models. Isolates mapping logic from adapters so adapters remain
 * focused on repository interactions and wiring. Keeps conversion code
 * reusable and testable in isolation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCodeRehydrator;

public final class SellerCodeJpaMapper {
  private SellerCodeJpaMapper() {}

  public static SellerCode toDomain(SellerCodeEntity e) {
    return SellerCodeRehydrator.rehydrate(
        e.getId(),
        e.getCode(),
        e.getOrganizationId(),
        e.getUserId(),
        e.getStatus(),
        e.getCreatedAt(),
        e.getUpdatedAt(),
        e.getDeletedAt(),
        e.getVersion() == null ? 0L : e.getVersion());
  }
}
