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
import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.application.font.usecase.CreateFontUseCase;
import com.poetry.poetry_backend.application.font.usecase.DeleteFontUseCase;
import com.poetry.poetry_backend.application.font.usecase.GetAllFontsUseCase;
import com.poetry.poetry_backend.application.font.usecase.GetFontByIdUseCase;
import com.poetry.poetry_backend.application.font.usecase.UpdateFontUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.font.FontAssetJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.font.FontAssetRepository;
import com.poetry.poetry_backend.infrastructure.jpa.font.FontAssetSeeder;
import com.poetry.poetry_backend.infrastructure.jpa.font.FontJpaAdapter;

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

  @Bean
  FontJpaAdapter fontJpaAdapter(FontAssetRepository repo) {
    return new FontJpaAdapter(repo);
  }

  // Use case beans

  @Bean
  GetAllFontsUseCase getAllFontsUseCase(FontQueryPort query) {
    return new GetAllFontsUseCase(query);
  }

  @Bean
  GetFontByIdUseCase getFontByIdUseCase(FontQueryPort query) {
    return new GetFontByIdUseCase(query);
  }

  @Bean
  CreateFontUseCase createFontUseCase(FontCommandPort command) {
    return new CreateFontUseCase(command);
  }

  @Bean
  UpdateFontUseCase updateFontUseCase(FontCommandPort command) {
    return new UpdateFontUseCase(command);
  }

  @Bean
  DeleteFontUseCase deleteFontUseCase(FontCommandPort command) {
    return new DeleteFontUseCase(command);
  }
}
