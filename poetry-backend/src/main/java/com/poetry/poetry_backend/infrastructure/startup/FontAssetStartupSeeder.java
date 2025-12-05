/*
 * File: FontAssetStartupSeeder.java
 * Purpose: ApplicationRunner that triggers font asset seeding at startup.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.infrastructure.jpa.font.adapter.FontAssetSeeder;

@Component
public class FontAssetStartupSeeder implements ApplicationRunner {
  private final FontAssetSeeder seeder;

  public FontAssetStartupSeeder(FontAssetSeeder seeder) { this.seeder = seeder; }

  @Override
  public void run(ApplicationArguments args) throws Exception {
    seeder.seed();
  }
}
