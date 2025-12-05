/*
 * File: ThemeJpaMapper.java
 * Purpose: Mapper between ThemeEntity and domain Theme aggregate.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.entity;

import java.util.HashMap;

import com.poetry.poetry_backend.domain.theme.model.Theme;

public final class ThemeJpaMapper {
  private ThemeJpaMapper() { }
  public static Theme toDomain(ThemeEntity e) {
    return new ThemeFactory().fromPersistence(e);
  }
  public static ThemeEntity toEntity(Theme d) {
    ThemeEntity e = new ThemeEntity();
    e.setId(d.getId());
    e.setKey(d.getKey());
    e.setName(d.getName());
    e.setActive(d.isActive());
    e.setColors(new HashMap<>(d.getColors()));
    return e;
  }
}
