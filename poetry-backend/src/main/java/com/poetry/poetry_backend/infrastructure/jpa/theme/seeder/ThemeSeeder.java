/*
 * File: ThemeSeeder.java
 * Purpose: Seed default themes if repository empty. Idempotent.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.seeder;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

  public void seed() {
    if (query.findAll().isEmpty()) {
      defaults().forEach(command::save);
    }
  }

  private List<Theme> defaults() {
    List<Theme> list = new ArrayList<>();
    for (String row : ThemeConstants.DEFAULT_THEMES) {
      String[] parts = row.split("\\|");
      // Format: key|name|colorKey=value,...
      String key = parts[0];
      String name = parts[1];
      Map<String, String> colors = new LinkedHashMap<>();
      for (String kv : parts[2].split(",")) {
        String[] kvp = kv.split("=");
        colors.put(kvp[0], kvp[1]);
      }
      list.add(Theme.createNew(key, name, colors));
    }
    return list;
  }
}
