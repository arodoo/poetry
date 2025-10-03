/*
 * File: SellerCode.java
 * Purpose: Immutable record representing seller code aggregate state.
 * Contains unique code identifier, organization reference, and status
 * tracking for seller validation and analytics within the system.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.sellercode.model;

import java.time.Instant;

public record SellerCode(
    Long id,
    String code,
    String organizationId,
    String status,
    Instant createdAt,
    Instant updatedAt,
    Instant deletedAt,
    long version) {
  public boolean isDeleted() {
    return deletedAt != null;
  }
}
