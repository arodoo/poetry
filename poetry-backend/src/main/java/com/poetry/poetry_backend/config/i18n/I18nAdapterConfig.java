/*
 * File: I18nAdapterConfig.java
 * Purpose: Configuration for i18n persistence adapter and ports.
 * Provides JPA adapter implementing both query and command ports.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;
import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.infrastructure.jpa.i18n.I18nJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.i18n.I18nJpaRepository;

@Configuration
public class I18nAdapterConfig {
  /**
   * Provide the persistence backed adapter implementing both query and command ports.
   * The existing MessageSource based adapter remains conceptually separate.
   */
  @Bean @Primary I18nJpaAdapter i18nJpaAdapter(
      I18nJpaRepository repo, MessageSource ms, AppConfigPort cfg) {
    return new I18nJpaAdapter(repo, ms, cfg);
  }

  // Expose same adapter under command port type for clarity (no duplication for query port)
  @Bean I18nCommandPort i18nCommandPort(I18nJpaAdapter adapter) {
    return adapter;
  }

  // Expose same adapter under query port type for clarity
  @Bean I18nQueryPort i18nQueryPort(I18nJpaAdapter adapter) {
    return adapter;
  }
}