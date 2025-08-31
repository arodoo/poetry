/*
 * File: I18nQueryPort.java
 * Purpose: Application port exposing read-only i18n policy and message
 * resolution operations decoupled from Spring MessageSource. This interface
 * defines the contract for querying supported locales and resolving messages
 * in a clean architecture compliant manner.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.port;

import java.util.List;

public interface I18nQueryPort {
  String defaultLocale();
  List<String> supportedLocales();
  String resolve(String key, String localeTag);
}
