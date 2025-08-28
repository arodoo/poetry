/*
 * File: LocalePreferenceJpaAdapter.java
 * Purpose: Adapter implementing LocalePreferenceRepository using JPA.
 * Maps between entity and domain aggregate. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.locale;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.domain.locale.LocalePreference;
import com.poetry.poetry_backend.domain.locale.LocalePreferenceRepository;

@Component
public class LocalePreferenceJpaAdapter implements LocalePreferenceRepository {
  private final LocalePreferenceJpaRepository repo;

  public LocalePreferenceJpaAdapter(LocalePreferenceJpaRepository repo) {
    this.repo = repo;
  }

  @Override
  public Optional<LocalePreference> findByUserId(String userId) {
    return repo.findById(userId).map(this::toDomain);
  }

  @Override
  public LocalePreference save(LocalePreference preference) {
    LocalePreferenceEntity e = toEntity(preference);
    LocalePreferenceEntity saved = repo.save(e);
    return toDomain(saved);
  }

  private LocalePreference toDomain(LocalePreferenceEntity e) {
    return LocalePreference.of(e.getUserId(), e.getLocale(), e.getUpdatedAt());
  }

  private LocalePreferenceEntity toEntity(LocalePreference p) {
    LocalePreferenceEntity e = new LocalePreferenceEntity();
    e.setUserId(p.userId());
    e.setLocale(p.locale());
    e.setUpdatedAt(p.updatedAt());
    return e;
  }
}
