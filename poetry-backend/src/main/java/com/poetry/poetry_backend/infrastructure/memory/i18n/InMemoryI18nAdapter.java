/*
 * File: InMemoryI18nAdapter.java
 * Purpose: Adapter bridging Spring MessageSource + AppConfigPort to the
 * I18nQueryPort. Provides message resolution with graceful fallback to
 * default locale and key-as-code behavior for missing entries.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.i18n;

import java.util.List;
import java.util.Locale;

import org.springframework.context.MessageSource;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;
import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;

public class InMemoryI18nAdapter implements I18nQueryPort {
  private final MessageSource messageSource;
  private final AppConfigPort appConfig;

  public InMemoryI18nAdapter(MessageSource messageSource, AppConfigPort appConfig) {
    this.messageSource = messageSource;
    this.appConfig = appConfig;
  }

  @Override public String defaultLocale() { return appConfig.defaultLocale(); }
  @Override public List<String> supportedLocales() { return appConfig.supportedLocales(); }
  @Override public String resolve(String key, String localeTag) {
    Locale loc = (localeTag == null || localeTag.isBlank())
        ? Locale.forLanguageTag(defaultLocale())
        : Locale.forLanguageTag(localeTag);
    return messageSource.getMessage(key, null, key, loc);
  }
}
