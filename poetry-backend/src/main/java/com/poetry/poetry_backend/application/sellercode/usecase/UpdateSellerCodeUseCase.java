/*
 * File: UpdateSellerCodeUseCase.java
 * Purpose: Coordinate updates to existing seller codes by validating input
 * enforcing domain rules and invoking command port to persist changes.
 * Returns updated domain object while isolating side-effects so logic can be
 * tested in isolation from infrastructure concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.sellercode.usecase;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

public class UpdateSellerCodeUseCase {
  private final SellerCodeCommandPort commands;

  public UpdateSellerCodeUseCase(SellerCodeCommandPort commands) {
    this.commands = commands;
  }

  public SellerCode execute(
      Long id,
      long version,
      String code,
      String organizationId,
      Long userId,
      String status) {
    return commands.update(id, version, code, organizationId, userId, status);
  }
}
