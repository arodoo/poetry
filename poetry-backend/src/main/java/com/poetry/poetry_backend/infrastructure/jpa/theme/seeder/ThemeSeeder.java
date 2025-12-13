/*
 * File: ThemeSeeder.java
 * Purpose: Seed and sync default themes. Creates missing themes and updates
 * existing ones with latest color definitions. Ensures all themes have current
 * tokens like onPrimary/overlay even after schema changes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.seeder;

import java.util.Map;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;

@Transactional
public class ThemeSeeder {
  private final ThemeQueryPort query;
  private final ThemeCommandPort command;

  public ThemeSeeder(ThemeQueryPort query, ThemeCommandPort command) {
    this.query = query;
    this.command = command;
  }

  /** Creates missing themes and updates existing ones with latest colors. */
  public void seed() {
    for (ThemeDefinition def : ThemeConstants.DEFAULTS) {
      upsertTheme(def);
    }
  }

  private void upsertTheme(ThemeDefinition def) {
    Map<String, String> colors = def.colors().toMap();
    Optional<Theme> existing = query.findByKey(def.key());
    if (existing.isPresent()) {
      Theme updated = existing.get().withUpdated(def.name(), colors);
      command.save(updated);
    } else {
      command.save(Theme.createNew(def.key(), def.name(), colors));
    }
  }
}
