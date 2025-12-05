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
import com.poetry.poetry_backend.application.theme.usecase.crud.ActivateThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.CreateThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.DeleteThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetActiveThemeUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetAllThemesUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetThemeByIdUseCase;
import com.poetry.poetry_backend.application.theme.usecase.crud.UpdateThemeUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.theme.entity.ThemeJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.theme.entity.ThemeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.theme.seeder.ThemeSeeder;
import com.poetry.poetry_backend.infrastructure.startup.ThemeStartupSeeder;

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
