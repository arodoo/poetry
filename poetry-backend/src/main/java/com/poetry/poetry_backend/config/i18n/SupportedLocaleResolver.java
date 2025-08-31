/*
 * File: SupportedLocaleResolver.java
 * Purpose: AcceptHeaderLocaleResolver enforcing configured supported locales.
 * This class extends the Spring locale resolver to validate that requested
 * locales are in the list of supported ones.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import java.util.List;
import java.util.Locale;

import org.springframework.lang.NonNull;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

final class SupportedLocaleResolver extends AcceptHeaderLocaleResolver {
  private final List<String> supported;
  private final Locale def;

  SupportedLocaleResolver(String defLocale, List<String> supportedLocales) {
    this.def = Locale.forLanguageTag(defLocale);
    this.supported = supportedLocales == null ? List.of() : supportedLocales;
    setDefaultLocale(this.def);
  }

  @Override
  public @NonNull Locale resolveLocale(@NonNull jakarta.servlet.http.HttpServletRequest req) {
    Locale cand = super.resolveLocale(req);
    if (supported.isEmpty()) return cand;
    String tag = cand.toLanguageTag();
    boolean match = supported.stream().anyMatch(tag::equalsIgnoreCase);
    return match ? cand : def;
  }
}
