/*
 * File: LocalePreferenceJpaRepository.java
 * Purpose: Spring Data repository for locale preference entity. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.locale;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalePreferenceJpaRepository
    extends JpaRepository<LocalePreferenceEntity, String> { }
