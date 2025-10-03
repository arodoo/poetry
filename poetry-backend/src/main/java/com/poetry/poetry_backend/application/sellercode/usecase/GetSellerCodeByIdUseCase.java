/*
 * File: GetSellerCodeByIdUseCase.java
 * Purpose: Retrieve single seller code by identifier and apply application-
 * level validations or mapping. Hides persistence and lookup details from
 * controllers and coordinates error handling for missing seller codes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.sellercode.usecase;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeQueryPort;
import com.poetry.poetry_backend.domain.sellercode.exception.SellerCodeNotFoundException;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

public class GetSellerCodeByIdUseCase {
  private final SellerCodeQueryPort query;

  public GetSellerCodeByIdUseCase(SellerCodeQueryPort query) {
    this.query = query;
  }

  public SellerCode execute(Long id) {
    SellerCode sc = query.findById(id);
    if (sc == null) {
      throw new SellerCodeNotFoundException(id);
    }
    return sc;
  }
}
