/*
 * File: GetAllZonesUseCase.java
 * Purpose: Retrieve all active zones from the system. Delegates to
 * zone query port and returns the list of zone aggregates for
 * consumption by the interface layer.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.zone.port.ZoneQueryPort;
import com.poetry.poetry_backend.domain.zone.model.Zone;

public class GetAllZonesUseCase {
  private final ZoneQueryPort queries;

  public GetAllZonesUseCase(ZoneQueryPort queries) {
    this.queries = queries;
  }

  public List<Zone> execute() {
    return queries.findAll();
  }
}
