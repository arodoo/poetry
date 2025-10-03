/*
 * File: SellerCodeCommandPort.java
 * Purpose: Define command operations for seller code lifecycle and mutations
 * used by the application layer. Exposes create update and soft-delete ops
 * while shielding application logic from persistence details. Implementations
 * must honor declared signatures and preserve domain invariants.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.sellercode.port;

import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

public interface SellerCodeCommandPort {
  SellerCode create(String code, String organizationId, String status);

  SellerCode update(
      Long id,
      long version,
      String code,
      String organizationId,
      String status);

  void softDelete(Long id, long version);
}
