/*
 * File: GetSupportedLocalesUseCase.java
 * Purpose: Use case returning supported locale list for clients. This class
 * implements the application logic to retrieve available locales from the
 * i18n port in a clean architecture compliant way.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;

public class GetSupportedLocalesUseCase {
  private final I18nQueryPort port;
  public GetSupportedLocalesUseCase(I18nQueryPort port) { this.port = port; }
  public List<String> execute() { return port.supportedLocales(); }
}
