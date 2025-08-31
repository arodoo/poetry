/*
 * File: I18n.java
 * Purpose: Aggregate representing platform i18n policy: default locale and
 * immutable supported locale list snapshot. Provides validation and helper
 * methods for locale introspection while remaining framework agnostic.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.i18n.model;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class I18n {
  private final String defaultLocale;
  private final List<String> supportedLocales;

  private I18n(String defaultLocale, List<String> supportedLocales) {
    this.defaultLocale = defaultLocale;
    this.supportedLocales = supportedLocales == null ? List.of() : supportedLocales;
  }

  public static I18n of(String defaultLocale, List<String> supported) {
    if (defaultLocale == null || defaultLocale.isBlank()) {
      throw new IllegalArgumentException("i18n.default.required");
    }
    if (supported != null && !supported.contains(defaultLocale)) {
      throw new IllegalArgumentException("i18n.default.notSupported");
    }
    List<String> copy = supported == null ? List.of() : supported;
    return new I18n(defaultLocale.trim(), List.copyOf(copy));
  }

  public String defaultLocale() { return defaultLocale; }

  public List<String> supportedLocales() {
    return Collections.unmodifiableList(supportedLocales);
  }

  public boolean isSupported(String locale) {
    return supportedLocales.isEmpty() || supportedLocales.contains(locale);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof I18n other)) return false;
    return defaultLocale.equals(other.defaultLocale)
        && supportedLocales.equals(other.supportedLocales);
  }

  @Override
  public int hashCode() { return Objects.hash(defaultLocale, supportedLocales); }
}
