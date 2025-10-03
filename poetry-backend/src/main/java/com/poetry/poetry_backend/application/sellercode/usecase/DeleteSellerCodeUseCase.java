/*
 * File: DeleteSellerCodeUseCase.java
 * Purpose: Coordinate soft deletion of seller codes by invoking command port.
 * Isolates side-effects from controllers ensuring deletion logic can be
 * tested independently from infrastructure details while enforcing consistent
 * soft delete semantics across the application layer.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.sellercode.usecase;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;

public class DeleteSellerCodeUseCase {
  private final SellerCodeCommandPort commands;

  public DeleteSellerCodeUseCase(SellerCodeCommandPort commands) {
    this.commands = commands;
  }

  public void execute(Long id, long version) {
    commands.softDelete(id, version);
  }
}
