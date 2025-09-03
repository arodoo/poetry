/*
 * File: I18nUseCaseConfig.java
 * Purpose: Configuration for i18n use case beans.
 * Provides all i18n use cases as Spring beans for dependency injection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.application.i18n.usecase.CreateI18nUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.DeleteI18nUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.GetSupportedLocalesUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.UpdateI18nUseCase;

@Configuration
public class I18nUseCaseConfig {
  @Bean GetSupportedLocalesUseCase getSupportedLocalesUseCase(I18nQueryPort port) {
    return new GetSupportedLocalesUseCase(port);
  }

  @Bean CreateI18nUseCase createI18nUseCase(I18nCommandPort cmd) {
    return new CreateI18nUseCase(cmd);
  }

  @Bean UpdateI18nUseCase updateI18nUseCase(I18nCommandPort cmd) {
    return new UpdateI18nUseCase(cmd);
  }

  @Bean DeleteI18nUseCase deleteI18nUseCase(I18nCommandPort cmd) {
    return new DeleteI18nUseCase(cmd);
  }

  @Bean ResolveMessageUseCase resolveMessageUseCase(I18nQueryPort port) {
    return new ResolveMessageUseCase(port);
  }
}