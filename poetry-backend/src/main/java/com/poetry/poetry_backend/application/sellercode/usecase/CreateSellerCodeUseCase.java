/*
 * File: CreateSellerCodeUseCase.java
 * Purpose: Coordinate creation of new seller codes by validating input using
 * domain rules and interacting with command ports to persist new entity.
 * Returns created domain object and isolates side-effects from controllers
 * for testable isolated business logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.sellercode.usecase;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

public class CreateSellerCodeUseCase {
  private final SellerCodeCommandPort commands;

  public CreateSellerCodeUseCase(SellerCodeCommandPort commands) {
    this.commands = commands;
  }

  public SellerCode execute(
      String code, String organizationId, String status) {
    return commands.create(code, organizationId, status);
  }
}
