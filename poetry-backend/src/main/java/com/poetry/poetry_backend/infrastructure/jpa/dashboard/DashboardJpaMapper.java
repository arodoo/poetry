/*
 * File: DashboardJpaMapper.java
 * Purpose: Map between Dashboard domain objects and JPA entities.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.dashboard;

import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

public final class DashboardJpaMapper {
  private DashboardJpaMapper() {}

  public static Dashboard toDomain(DashboardEntity entity) {
    return new Dashboard(
        entity.getId(),
        entity.getName(),
        entity.getSlug(),
        entity.getDescription(),
        entity.getCreatedAt());
  }

  public static DashboardEntity toEntity(Dashboard dashboard) {
    return new DashboardEntity(
        dashboard.id(),
        dashboard.name(),
        dashboard.slug(),
        dashboard.description(),
        dashboard.createdAt());
  }
}
