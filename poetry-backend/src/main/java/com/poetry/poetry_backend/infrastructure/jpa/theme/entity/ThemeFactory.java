/*
 * File: ThemeFactory.java
 * Purpose: Factory rebuilding domain Theme from persistence entity.
 * Converts JPA ThemeEntity objects back to domain Theme aggregates.
 * Uses reflection to bypass validation during reconstruction.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.entity;

import java.util.HashMap;

import com.poetry.poetry_backend.domain.theme.model.Theme;

class ThemeFactory {
  Theme fromPersistence(ThemeEntity e) {
    return new ThemeBuilder()
        .id(e.getId())
        .key(e.getKey())
        .name(e.getName())
        .active(e.isActive())
        .deleted(e.getDeletedAt() != null)
        .colors(new HashMap<>(e.getColors()))
        .build();
  }
}

class ThemeBuilder {
  private Long id;
  private String key;
  private String name;
  private boolean active;
  private boolean deleted;
  private java.util.Map<String, String> colors = new java.util.HashMap<>();
  ThemeBuilder id(Long v) { this.id = v; return this; }
  ThemeBuilder key(String v) { this.key = v; return this; }
  ThemeBuilder name(String v) { this.name = v; return this; }
  ThemeBuilder active(boolean v) { this.active = v; return this; }
  ThemeBuilder deleted(boolean v) { this.deleted = v; return this; }
  ThemeBuilder colors(java.util.Map<String, String> v) { this.colors = v; return this; }
  Theme build() {
    // bypass validation when rebuilding
    try {
      java.lang.reflect.Constructor<Theme> c = Theme.class.getDeclaredConstructor(
          Long.class, String.class, String.class, boolean.class,
          java.util.Map.class, boolean.class);
      c.setAccessible(true);
      return c.newInstance(id, key, name, active, colors, deleted);
    } catch (Exception ex) { throw new IllegalStateException(ex); }
  }
}
