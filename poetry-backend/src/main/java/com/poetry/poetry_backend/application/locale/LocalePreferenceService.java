/*
 * File: LocalePreferenceService.java
 * Purpose: Application service orchestrating locale preference retrieval
 * and updates with whitelist validation using AppProperties. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.locale;

import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.domain.locale.LocalePreference;
import com.poetry.poetry_backend.domain.locale.LocalePreferenceRepository;
import com.poetry.poetry_backend.infrastructure.config.AppProperties;

@Service
public class LocalePreferenceService {
  private final LocalePreferenceRepository repo;
  private final AppProperties appProps;

  public LocalePreferenceService(LocalePreferenceRepository repo, AppProperties appProps) {
    this.repo = repo;
    this.appProps = appProps;
  }

  public String resolveLocaleForUser(String userId, Locale requestLocale) {
    return repo.findByUserId(userId).map(LocalePreference::locale)
        .orElseGet(() -> fallback(requestLocale));
  }

  @Transactional
  public LocalePreference set(SetUserLocaleCommand cmd) {
    validateLocale(cmd.locale());
    Optional<LocalePreference> existing = repo.findByUserId(cmd.userId());
    LocalePreference pref = existing
        .map(p -> p.withLocale(cmd.locale(), Instant.now()))
        .orElse(LocalePreference.of(cmd.userId(), cmd.locale(), Instant.now()));
    return repo.save(pref);
  }

  private void validateLocale(String code) {
    if (code == null || code.isBlank())
      throw new IllegalArgumentException("locale.pref.locale.required");
    List<String> supported = appProps.supportedLocales();
    if (supported == null || supported.isEmpty()) return; // treat as open set
    if (!supported.contains(code))
      throw new IllegalArgumentException("locale.pref.locale.unsupported");
  }

  private String fallback(Locale requestLocale) {
    List<String> supported = appProps.supportedLocales();
    String def = appProps.defaultLocale();
    if (requestLocale != null && supported != null && 
        supported.contains(requestLocale.toLanguageTag()))
      return requestLocale.toLanguageTag();
    return def;
  }
}
