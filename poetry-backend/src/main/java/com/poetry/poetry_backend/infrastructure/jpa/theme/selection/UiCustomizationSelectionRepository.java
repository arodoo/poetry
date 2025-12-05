/*
 * File: UiCustomizationSelectionRepository.java
 * Purpose: Spring Data repository for UiCustomizationSelectionEntity.
 * Provides data access for UI customization selections.
 * Supports finding top selection by ID for system preferences.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.selection;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UiCustomizationSelectionRepository
    extends JpaRepository<UiCustomizationSelectionEntity, Long> {
  Optional<UiCustomizationSelectionEntity> findTopByOrderByIdAsc();
}
