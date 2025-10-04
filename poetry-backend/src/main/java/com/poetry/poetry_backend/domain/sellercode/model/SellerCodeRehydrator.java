/*
 * File: SellerCodeRehydrator.java
 * Purpose: Rebuild SellerCode aggregates from persisted representations while
 * reapplying validation rules to guard against inconsistent records. Keeps
 * factory logic modular to respect file length policies ensuring consistency
 * between fresh creates and rehydrated entities.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.sellercode.model;

import java.time.Instant;

public final class SellerCodeRehydrator {
  private SellerCodeRehydrator() {}

  public static SellerCode rehydrate(
      Long id,
      String code,
      String organizationId,
      Long userId,
      String status,
      Instant createdAt,
      Instant updatedAt,
      Instant deletedAt,
      long version) {
    return new SellerCode(
        id, code, organizationId, userId, status, createdAt, updatedAt, deletedAt, version);
  }
}
