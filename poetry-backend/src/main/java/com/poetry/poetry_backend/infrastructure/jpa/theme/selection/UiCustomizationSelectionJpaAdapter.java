/*
 * File: UiCustomizationSelectionJpaAdapter.java
 * Purpose: JPA adapter implementing customization selection ports.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.selection;

import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.theme.port.*;
import com.poetry.poetry_backend.domain.theme.model.*;

@Transactional
// Preferred persistence implementation over in-memory stub.
@org.springframework.context.annotation.Primary
public class UiCustomizationSelectionJpaAdapter implements
    CustomizationSelectionQueryPort, CustomizationSelectionCommandPort {
  private final UiCustomizationSelectionRepository repo;

  public UiCustomizationSelectionJpaAdapter(UiCustomizationSelectionRepository repo) {
    this.repo = repo;
  }

  @Override
  public Optional<UiCustomizationSelection> getSystemSelection() {
    return repo.findTopByOrderByIdAsc().map(this::toDomain);
  }

  @Override
  public UiCustomizationSelection saveSystemSelection(UiCustomizationSelection selection) {
    UiCustomizationSelectionEntity entity =
        repo.findTopByOrderByIdAsc().orElseGet(UiCustomizationSelectionEntity::new);
    entity.setThemeKey(selection.themeKey());
    entity.setFontKey(selection.fontKey());
    entity.setFontSizeKey(selection.fontSizeKey());
    entity.setSpacingKey(selection.spacingKey());
    entity.setRadiusKey(selection.radiusKey());
    entity.setShadowKey(selection.shadowKey());
    UiCustomizationSelectionEntity saved = repo.save(entity);
    return toDomain(saved);
  }

  private UiCustomizationSelection toDomain(UiCustomizationSelectionEntity e) {
    return new UiCustomizationSelection(
        e.getThemeKey(),
        e.getFontKey(),
        e.getFontSizeKey(),
        e.getSpacingKey(),
        e.getRadiusKey(),
        e.getShadowKey()
    );
  }
}
