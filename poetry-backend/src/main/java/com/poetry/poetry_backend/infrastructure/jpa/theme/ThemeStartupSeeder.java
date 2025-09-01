/*
 * File: ThemeStartupSeeder.java
 * Purpose: ApplicationReady listener triggering theme seeding.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

public class ThemeStartupSeeder {
  private final ThemeSeeder themeSeeder;

  public ThemeStartupSeeder(ThemeSeeder themeSeeder) {
    this.themeSeeder = themeSeeder;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onReady() {
    themeSeeder.seed();
  }
}
