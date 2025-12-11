/*
 * File: GetSellerCodesPageUseCase.java
 * Purpose: Retrieve paginated seller codes with optional search.
 * Enforces page size limits (1-100) for performance and security.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.sellercode.usecase;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeQueryPort;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.domain.shared.model.PageResult;

public class GetSellerCodesPageUseCase {

  private final SellerCodeQueryPort queryPort;

  public GetSellerCodesPageUseCase(final SellerCodeQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public PageResult<SellerCode> execute(
      final int page, final int size, final String search) {
    if (page < 0) {
      throw new IllegalArgumentException("page.number.negative");
    }
    if (size < 1 || size > 100) {
      throw new IllegalArgumentException("page.size.invalid");
    }
    String sanitizedSearch = search == null ? "" : search.trim();
    return queryPort.findAllPaged(page, size, sanitizedSearch);
  }
}
