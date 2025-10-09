/*
 * File: ZoneQueryPort.java
 * Purpose: Define query operations for zone retrieval used by the
 * application layer. Exposes read-only operations including list,
 * pagination, and single item lookup while shielding application
 * logic from persistence details.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.port;

import java.util.List;

import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.zone.model.Zone;

public interface ZoneQueryPort {
  List<Zone> findAll();

  PageResult<Zone> findAllPaged(int page, int size, String search);

  Zone findById(Long id);
}
