/*
 * File: I18nCommandPort.java
 * Purpose: Command port for CRUD placeholder (structural compliance).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.port;

import com.poetry.poetry_backend.domain.i18n.model.I18n;

public interface I18nCommandPort {
  I18n create(I18n i18n);
  I18n update(Long id, I18n i18n);
  void delete(Long id);
}
