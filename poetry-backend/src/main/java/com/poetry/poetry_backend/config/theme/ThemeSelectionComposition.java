/*
 * File: ThemeSelectionComposition.java
 * Purpose: Composition wiring for theme selection module.
 * Provides beans for customization selection ports and use cases.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.theme;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionCommandPort;
import com.poetry.poetry_backend.application.theme.port.CustomizationSelectionQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.selection.GetSystemSelectionUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.ResolveCurrentSelectionUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.theme.selection.UiCustomizationSelectionJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.theme.selection.UiCustomizationSelectionRepository;

@Configuration
public class ThemeSelectionComposition {
  @Bean
  @Primary // Ensure this implementation is chosen over the in-memory adapter
  UiCustomizationSelectionJpaAdapter uiCustomizationSelectionJpaAdapter(
      UiCustomizationSelectionRepository repo) {
    return new UiCustomizationSelectionJpaAdapter(repo);
  }

  @Bean
  GetSystemSelectionUseCase getSystemSelectionUseCase(CustomizationSelectionQueryPort query) {
    return new GetSystemSelectionUseCase(query);
  }

  @Bean
  SaveSystemSelectionUseCase saveSystemSelectionUseCase(CustomizationSelectionCommandPort command) {
    return new SaveSystemSelectionUseCase(command);
  }

  @Bean
  ResolveCurrentSelectionUseCase resolveCurrentSelectionUseCase(
      com.poetry.poetry_backend.application.theme.usecase.GetActiveThemeUseCase activeTheme,
      CustomizationSelectionQueryPort selectionQuery) {
    return new ResolveCurrentSelectionUseCase(activeTheme, selectionQuery);
  }
}