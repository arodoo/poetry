/*
 * File: ResolveMessageUseCase.java
 * Purpose: Use case resolving a message key for an optional locale tag. This
 * class handles the business logic for internationalizing messages by
 * delegating to the i18n port for resolution.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;

public class ResolveMessageUseCase {
  private final I18nQueryPort port;
  public ResolveMessageUseCase(I18nQueryPort port) { this.port = port; }
  public String execute(String key, String localeTag) { return port.resolve(key, localeTag); }
}
