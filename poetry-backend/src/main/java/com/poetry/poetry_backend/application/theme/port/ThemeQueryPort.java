/*
 * File: ThemeQueryPort.java
 * Purpose: Application port for querying theme aggregate data.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.port;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.domain.theme.model.Theme;

public interface ThemeQueryPort {
  List<Theme> findAll();

  Optional<Theme> findById(Long id);

  Optional<Theme> findByKey(String key);

  Optional<Theme> findActive();
}
