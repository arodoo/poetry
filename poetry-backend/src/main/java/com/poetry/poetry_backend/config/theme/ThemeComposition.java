/*
 * File: ThemeComposition.java
 * Purpose: Composition wiring for theme module (ports, use cases,
 * adapter, seeding) following backend module blueprint.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.theme;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.ActivateThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.CreateThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.DeleteThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.GetAllThemesUseCase;
import com.poetry.poetry_backend.application.theme.usecase.GetThemeByIdUseCase;
import com.poetry.poetry_backend.application.theme.usecase.UpdateThemeUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.theme.ThemeJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.theme.ThemeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.theme.ThemeSeeder;
import com.poetry.poetry_backend.infrastructure.jpa.theme.ThemeStartupSeeder;

@Configuration
public class ThemeComposition {
  @Bean
  ThemeJpaAdapter themeJpaAdapter(ThemeJpaRepository repo) {
    return new ThemeJpaAdapter(repo);
  }

  @Bean
  GetAllThemesUseCase getAllThemesUseCase(ThemeQueryPort query) {
    return new GetAllThemesUseCase(query);
  }

  @Bean
  GetThemeByIdUseCase getThemeByIdUseCase(ThemeQueryPort query) {
    return new GetThemeByIdUseCase(query);
  }

  @Bean
  GetActiveThemeUseCase getActiveThemeUseCase(ThemeQueryPort query) {
    return new GetActiveThemeUseCase(query);
  }

  @Bean
  CreateThemeUseCase createThemeUseCase(ThemeCommandPort command) {
    return new CreateThemeUseCase(command);
  }

  @Bean
  UpdateThemeUseCase updateThemeUseCase(ThemeQueryPort query,
      ThemeCommandPort command) {
    return new UpdateThemeUseCase(query, command);
  }

  @Bean
  DeleteThemeUseCase deleteThemeUseCase(ThemeCommandPort command) {
    return new DeleteThemeUseCase(command);
  }

  @Bean
  ActivateThemeUseCase activateThemeUseCase(ThemeQueryPort query,
      ThemeCommandPort command) {
    return new ActivateThemeUseCase(query, command);
  }

  @Bean
  ThemeSeeder themeSeeder(ThemeQueryPort query, ThemeCommandPort command) {
    return new ThemeSeeder(query, command);
  }

  @Bean
  ThemeStartupSeeder themeStartupSeeder(ThemeSeeder seeder) {
    return new ThemeStartupSeeder(seeder);
  }
}
