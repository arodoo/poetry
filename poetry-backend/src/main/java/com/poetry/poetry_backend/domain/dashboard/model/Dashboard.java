/*
 * File: Dashboard.java
 * Purpose: Aggregate root describing a saved dashboard configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.model;

import java.time.Instant;
import java.util.Objects;

public record Dashboard(
    Long id,
    String name,
    String slug,
    String description,
    Instant createdAt) {

  public Dashboard {
    if (name == null || name.isBlank()) {
      throw new IllegalArgumentException("dashboard.name.blank");
    }
    if (slug == null || slug.isBlank()) {
      throw new IllegalArgumentException("dashboard.slug.blank");
    }
    if (!slug.matches("[a-z0-9-]{3,50}")) {
      throw new IllegalArgumentException("dashboard.slug.invalid");
    }
    if (description != null && description.length() > 160) {
      throw new IllegalArgumentException("dashboard.description.tooLong");
    }
    createdAt = Objects.requireNonNullElse(createdAt, Instant.now());
  }
}
