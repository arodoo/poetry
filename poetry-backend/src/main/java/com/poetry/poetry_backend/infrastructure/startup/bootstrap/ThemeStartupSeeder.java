/*
 * File: ThemeStartupSeeder.java
 * Purpose: ApplicationReady listener that triggers theme seeding at startup.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.poetry.poetry_backend.infrastructure.jpa.theme.seeder.ThemeSeeder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ThemeStartupSeeder {
  private final ThemeSeeder themeSeeder;

  public ThemeStartupSeeder(ThemeSeeder themeSeeder) {
    this.themeSeeder = themeSeeder;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onReady() {
    log.info("ThemeStartupSeeder: starting theme seeding...");
    try {
      themeSeeder.seed();
      log.info("ThemeStartupSeeder: theme seeding complete.");
    } catch (Exception e) {
      log.error("ThemeStartupSeeder: failed to seed themes", e);
    }
  }
}
