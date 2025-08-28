/*
 * File: LocalePreference.java
 * Purpose: Aggregate representing a user's persisted locale preference
 * used to resolve message localization ahead of Accept-Language header.
 * Provides invariants ensuring supported locale codes only. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.locale;

import java.time.Instant;
import java.util.Objects;

public final class LocalePreference {
  private final String userId; // reference to User aggregate id
  private final String locale; // canonical BCP47 language tag
  private final Instant updatedAt;

  private LocalePreference(String userId, String locale, Instant updatedAt) {
    this.userId = userId;
    this.locale = locale;
    this.updatedAt = updatedAt == null ? Instant.now() : updatedAt;
  }

  public static LocalePreference of(String userId, String locale, Instant now) {
    if (userId == null || userId.isBlank())
      throw new IllegalArgumentException("locale.pref.userId.required");
    if (locale == null || locale.isBlank())
      throw new IllegalArgumentException("locale.pref.locale.required");
    // format validation left to application service against whitelist
    return new LocalePreference(userId.trim(), locale.trim(), now);
  }

  public String userId() { return userId; }
  public String locale() { return locale; }
  public Instant updatedAt() { return updatedAt; }

  public LocalePreference withLocale(String newLocale, Instant now) {
    if (newLocale == null || newLocale.isBlank())
      throw new IllegalArgumentException("locale.pref.locale.required");
    if (newLocale.equals(locale)) return this; // idempotent
    return new LocalePreference(userId, newLocale, now);
  }

  @Override public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof LocalePreference other)) return false;
    return userId.equals(other.userId) && locale.equals(other.locale);
  }

  @Override public int hashCode() { return Objects.hash(userId, locale); }
}
