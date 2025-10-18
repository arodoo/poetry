/*
 * File: DashboardDto.java
 * Purpose: REST DTOs and mappers for dashboard endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dashboard;

import java.time.Instant;
import java.util.List;

import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;
import com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview;

public final class DashboardDto {
  private DashboardDto() {}

  public record DashboardResponse(
      Long id, String name, String slug, String description, Instant createdAt) {}

  public record CreateDashboardRequest(String name, String slug, String description) {}

  public record UpdateDashboardRequest(String name, String slug, String description) {}

  public record DashboardOverviewResponse(
      int totalPoems,
      int publishedPoems,
      int draftPoems,
      int activeMembers,
      String highlightKey,
      String lastUpdatedLabel) {}

  public static DashboardResponse toDashboardResponse(Dashboard model) {
    return new DashboardResponse(
        model.id(), model.name(), model.slug(), model.description(), model.createdAt());
  }

  public static List<DashboardResponse> toDashboardResponses(List<Dashboard> dashboards) {
    return dashboards.stream().map(DashboardDto::toDashboardResponse).toList();
  }

  public static DashboardOverviewResponse toResponse(DashboardOverview model) {
    return new DashboardOverviewResponse(
        model.totalPoems(),
        model.publishedPoems(),
        model.draftPoems(),
        model.activeMembers(),
        model.highlightKey(),
        model.lastUpdatedLabel());
  }
}
