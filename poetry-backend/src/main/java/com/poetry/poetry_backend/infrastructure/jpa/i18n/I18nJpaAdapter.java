/*
 * File: I18nJpaAdapter.java
 * Purpose: JPA adapter implementing i18n query and command ports.
 * Thin adapter that delegates to I18nJpaOperations for business logic.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.i18n;

import java.util.List;

import org.springframework.context.MessageSource;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;
import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

public class I18nJpaAdapter implements I18nQueryPort, I18nCommandPort {
  private final I18nJpaOperations operations;

  public I18nJpaAdapter(I18nJpaRepository repo, MessageSource messageSource,
      AppConfigPort appConfig) {
    this.operations = new I18nJpaOperations(repo, messageSource, appConfig);
  }

  @Override
  public String defaultLocale() {
    return operations.defaultLocale();
  }

  @Override
  public List<String> supportedLocales() {
    return operations.supportedLocales();
  }

  @Override
  public String resolve(String key, String localeTag) {
    return operations.resolveMessage(key, localeTag);
  }

  @Override
  @Transactional
  public I18n create(I18n i18n) {
    return operations.create(i18n);
  }

  @Override
  @Transactional
  public I18n update(Long id, I18n i18n) {
    return operations.update(id, i18n);
  }

  @Override
  @Transactional
  public void delete(Long id) {
    operations.delete(id);
  }
}
