/*
 * File: LocalePreferenceEntity.java
 * Purpose: JPA entity for persisting user locale preferences. Kept small
 * to satisfy line limits; maps directly to domain aggregate. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.locale;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_locale_prefs")
public class LocalePreferenceEntity {
  @Id
  @Column(name = "user_id", nullable = false, length = 64)
  private String userId;

  @Column(name = "locale", nullable = false, length = 16)
  private String locale;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  public String getUserId() { return userId; }
  public void setUserId(String userId) { this.userId = userId; }
  public String getLocale() { return locale; }
  public void setLocale(String locale) { this.locale = locale; }
  public Instant getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
