/*
 * File: GetZoneByIdUseCase.java
 * Purpose: Retrieve single zone by unique identifier. Delegates to
 * query port which throws ZoneNotFoundException if not found or
 * soft deleted ensuring consistent error handling.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.usecase;

import com.poetry.poetry_backend.application.zone.port.ZoneQueryPort;
import com.poetry.poetry_backend.domain.zone.model.Zone;

public class GetZoneByIdUseCase {
  private final ZoneQueryPort queries;

  public GetZoneByIdUseCase(ZoneQueryPort queries) {
    this.queries = queries;
  }

  public Zone execute(Long id) {
    return queries.findById(id);
  }
}
