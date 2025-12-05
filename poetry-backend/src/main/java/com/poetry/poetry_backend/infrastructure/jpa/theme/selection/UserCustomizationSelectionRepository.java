/*
 * File: UserCustomizationSelectionRepository.java
 * Purpose: Repository for future per-user UI customization selections.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.selection;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCustomizationSelectionRepository
    extends JpaRepository<UserCustomizationSelectionEntity, Long> {
  Optional<UserCustomizationSelectionEntity> findTopByUserIdOrderByIdDesc(Long userId);
}
