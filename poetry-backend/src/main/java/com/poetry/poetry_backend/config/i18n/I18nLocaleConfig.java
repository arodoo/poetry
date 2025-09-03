/*
 * File: I18nLocaleConfig.java
 * Purpose: Configuration for i18n locale resolution components.
 * Provides AcceptHeaderLocaleResolver with path-aware locale resolution.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;

@Configuration
public class I18nLocaleConfig {
  @Bean AcceptHeaderLocaleResolver localeResolver(AppConfigPort cfg) {
    var base = new PathAwareLocaleResolver();
    base.setDefaultLocale(java.util.Locale.forLanguageTag(cfg.defaultLocale()));
    return base;
  }
}