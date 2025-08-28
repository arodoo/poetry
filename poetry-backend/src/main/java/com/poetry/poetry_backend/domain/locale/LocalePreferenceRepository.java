/*
 * File: LocalePreferenceRepository.java
 * Purpose: Port interface for persistence of user locale preferences.
 * Abstracts storage so application layer remains decoupled from JPA or
 * other infrastructure. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.locale;

import java.util.Optional;

public interface LocalePreferenceRepository {
  Optional<LocalePreference> findByUserId(String userId);
  LocalePreference save(LocalePreference preference);
}
