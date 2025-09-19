/*
 * File: ThemeStartupSeeder.java
 * Purpose: ApplicationReady listener that triggers theme seeding at startup.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.infrastructure.jpa.theme.ThemeSeeder;

@Component
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
