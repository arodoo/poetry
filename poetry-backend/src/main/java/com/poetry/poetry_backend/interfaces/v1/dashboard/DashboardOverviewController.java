/*
 * File: DashboardOverviewController.java
 * Purpose: Expose GET /api/v1/dashboard/overview endpoint returning metrics.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dashboard;

import static com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDtos.toResponse;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.dashboard.usecase.GetDashboardOverviewUseCase;
import com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview;
import com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDtos.DashboardOverviewResponse;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardOverviewController {
  private final GetDashboardOverviewUseCase getOverview;

  public DashboardOverviewController(GetDashboardOverviewUseCase getOverview) {
    this.getOverview = getOverview;
  }

  @GetMapping("/overview")
  public ResponseEntity<DashboardOverviewResponse> overview() {
    Optional<DashboardOverview> overview = getOverview.execute();
    if (overview.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    DashboardOverview model = overview.get();
    String version = model.lastUpdatedLabel() + ':' + model.totalPoems();
    String eTag = "W/\"dashboard-" + Integer.toHexString(version.hashCode()) + "\"";
    return ResponseEntity.ok().eTag(eTag).body(toResponse(model));
  }
}
