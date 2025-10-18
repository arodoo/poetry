/*
 * File: DashboardController.java
 * Purpose: Query REST interface for dashboard listings and details.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dashboard;

import static com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDto.toDashboardResponse;
import static com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDto.toDashboardResponses;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.dashboard.usecase.GetAllDashboardsUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.GetDashboardByIdUseCase;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;
import com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDto.DashboardResponse;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
  private final GetAllDashboardsUseCase getAll;
  private final GetDashboardByIdUseCase getById;

  public DashboardController(
      GetAllDashboardsUseCase getAll, GetDashboardByIdUseCase getById) {
    this.getAll = getAll;
    this.getById = getById;
  }

  @GetMapping
  public ResponseEntity<List<DashboardResponse>> getDashboards() {
    List<Dashboard> dashboards = getAll.execute();
    String seed = dashboards.stream()
        .map(d -> d.slug() + ':' + d.createdAt())
        .reduce("dashboard", (left, right) -> left + right);
    String eTag = "W/\"dashboards-" + Integer.toHexString(seed.hashCode()) + "\"";
    return ResponseEntity.ok().eTag(eTag).body(toDashboardResponses(dashboards));
  }

  @GetMapping("/{id}")
  public DashboardResponse getDashboard(@PathVariable Long id) {
    return toDashboardResponse(getById.execute(id));
  }
}
