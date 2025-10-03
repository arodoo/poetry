/*
 * File: GetAllSellerCodesUseCase.java
 * Purpose: Retrieve all seller codes via query port and apply application-
 * level mapping, filtering or sorting for callers. Centralizes read logic so
 * controllers remain thin and mapping logic is testable in isolation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.sellercode.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeQueryPort;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

public class GetAllSellerCodesUseCase {
  private final SellerCodeQueryPort query;

  public GetAllSellerCodesUseCase(SellerCodeQueryPort query) {
    this.query = query;
  }

  public List<SellerCode> execute() {
    return query.findAll();
  }
}
