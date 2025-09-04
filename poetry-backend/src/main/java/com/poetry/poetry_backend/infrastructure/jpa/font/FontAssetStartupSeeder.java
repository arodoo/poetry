/*
 * File: FontAssetStartupSeeder.java
 * Purpose: Application runner to invoke font asset seeding.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.font;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class FontAssetStartupSeeder implements ApplicationRunner {
  private final FontAssetSeeder seeder;

  public FontAssetStartupSeeder(FontAssetSeeder seeder) { this.seeder = seeder; }

  @Override
  public void run(ApplicationArguments args) throws Exception {
    seeder.seed();
  }
}
