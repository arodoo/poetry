/*
 * File: GetZonesPageUseCase.java
 * Purpose: Retrieve paginated zones with validation. Ensures page
 * and size constraints before delegating to query port and returning
 * paginated result with total count metadata.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.usecase;

import com.poetry.poetry_backend.application.zone.port.ZoneQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.zone.model.Zone;

public class GetZonesPageUseCase {
  private final ZoneQueryPort queries;

  public GetZonesPageUseCase(ZoneQueryPort queries) {
    this.queries = queries;
  }

  public PageResult<Zone> execute(int page, int size, String search) {
    if (page < 0) {
      throw new IllegalArgumentException("zone.page.negative");
    }
    if (size < 1 || size > 100) {
      throw new IllegalArgumentException("zone.size.range");
    }
    return queries.findAllPaged(page, size, search);
  }
}
