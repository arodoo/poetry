/*
 * File: Theme.java
 * Purpose: Domain model for a UI theme aggregate (id, name, active flag, colors, soft delete).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Theme {
  private Long id;
  private String name;
  private boolean active;
  private Map<String, String> colors;
  private boolean deleted;

  private Theme(Long id, String name, boolean active, Map<String, String> colors,
      boolean deleted) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.colors = colors;
    this.deleted = deleted;
  }

  public static Theme createNew(String name, Map<String, String> colors) {
    ThemeValidator.validate(name, colors);
    return new Theme(null, name.trim(), false, new HashMap<>(colors), false);
  }

  public Theme withActivated(boolean value) {
    return new Theme(id, name, value, new HashMap<>(colors), deleted);
  }

  public Theme withUpdated(String name, Map<String, String> colors) {
    ThemeValidator.validate(name, colors);
    return new Theme(id, name.trim(), active, new HashMap<>(colors), deleted);
  }

  public Theme markDeleted() { return new Theme(id, name, active, colors, true); }
  public Theme restore() { return new Theme(id, name, active, colors, false); }

  // Getters
  public Long getId() { return id; }
  public String getName() { return name; }
  public boolean isActive() { return active; }
  public Map<String, String> getColors() { return Collections.unmodifiableMap(colors); }
  public boolean isDeleted() { return deleted; }
  public Theme withId(Long id) { return new Theme(id, name, active, colors, deleted); }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Theme)) return false;
    Theme theme = (Theme) o;
    return Objects.equals(id, theme.id);
  }

  @Override
  public int hashCode() { return Objects.hashCode(id); }
}
