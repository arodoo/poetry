/*
 * File: I18nJpaMapper.java
 * Purpose: Map between domain I18n aggregate and JPA entity.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.i18n;

import com.poetry.poetry_backend.domain.i18n.model.I18n;

public final class I18nJpaMapper {
  private I18nJpaMapper() { }

  public static I18n toDomain(I18nEntity entity) {
    if (entity == null) {
      return null;
    }
    return I18n.of(entity.getDefaultLocale(), entity.getSupportedLocales());
  }

  public static I18nEntity toEntity(I18n domain) {
    if (domain == null) {
      return null;
    }
    I18nEntity e = new I18nEntity();
    e.setDefaultLocale(domain.defaultLocale());
    e.setSupportedLocales(domain.supportedLocales());
    return e;
  }
}
