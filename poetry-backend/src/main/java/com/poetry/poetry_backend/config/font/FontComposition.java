/*
 * File: FontComposition.java
 * Purpose: Composition wiring for font assets module.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.font;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.font.port.FontAssetCommandPort;
import com.poetry.poetry_backend.application.font.port.FontAssetQueryPort;
import com.poetry.poetry_backend.infrastructure.jpa.font.FontAssetJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.font.FontAssetRepository;
import com.poetry.poetry_backend.infrastructure.jpa.font.FontAssetSeeder;

@Configuration
public class FontComposition {
  @Bean
  FontAssetJpaAdapter fontAssetJpaAdapter(FontAssetRepository repo) {
    return new FontAssetJpaAdapter(repo);
  }

  @Bean
  FontAssetSeeder fontAssetSeeder(FontAssetQueryPort query, FontAssetCommandPort command) {
    return new FontAssetSeeder(query, command);
  }
}
