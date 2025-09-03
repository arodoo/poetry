/*
 * File: I18nJpaOperations.java
 * Purpose: Core business logic for i18n JPA operations.
 * Handles singleton management, locale resolution, and CRUD operations.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.i18n;

import java.util.List;
import java.util.Optional;

import org.springframework.context.MessageSource;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

public class I18nJpaOperations {
  private final I18nJpaRepository repo;
  private final MessageSource messageSource;
  private final AppConfigPort appConfig;

  public I18nJpaOperations(I18nJpaRepository repo, MessageSource messageSource,
      AppConfigPort appConfig) {
    this.repo = repo;
    this.messageSource = messageSource;
    this.appConfig = appConfig;
  }

  public I18n ensureSingleton() {
    List<I18nEntity> all = repo.findAll();
    if (all.isEmpty()) {
      String def = appConfig.defaultLocale();
      List<String> supported = appConfig.supportedLocales();
      I18n seed = I18n.of(def, supported);
      I18nEntity created = repo.save(I18nJpaMapper.toEntity(seed));
      return I18nJpaMapper.toDomain(created);
    }
    return I18nJpaMapper.toDomain(all.get(0));
  }

  public String resolveMessage(String key, String localeTag) {
    var requested = java.util.Locale.forLanguageTag(
        localeTag == null || localeTag.isBlank() ? defaultLocale() : localeTag);
    var def = java.util.Locale.forLanguageTag(defaultLocale());
    String msg = messageSource.getMessage(key, null, null, requested);
    if (msg == null) {
      msg = messageSource.getMessage(key, null, key, def);
    }
    return msg;
  }

  public I18n create(I18n i18n) {
    Optional<I18nEntity> existing = repo.findAll().stream().findFirst();
    I18nEntity entity = I18nJpaMapper.toEntity(i18n);
    existing.ifPresent(e -> entity.setId(e.getId()));
    return I18nJpaMapper.toDomain(repo.save(entity));
  }

  public I18n update(Long id, I18n i18n) {
    I18nEntity entity = I18nJpaMapper.toEntity(i18n);
    entity.setId(id);
    return I18nJpaMapper.toDomain(repo.save(entity));
  }

  public void delete(Long id) {
    repo.deleteById(id);
  }

  public String defaultLocale() {
    return ensureSingleton().defaultLocale();
  }

  public List<String> supportedLocales() {
    return ensureSingleton().supportedLocales();
  }
}