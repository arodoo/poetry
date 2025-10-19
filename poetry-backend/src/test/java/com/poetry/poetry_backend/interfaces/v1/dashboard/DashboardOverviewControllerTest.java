/*
 * File: DashboardOverviewControllerTest.java
 * Purpose: Verify controller maps use case response correctly.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dashboard;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.poetry.poetry_backend.application.dashboard.port.DashboardOverviewQueryPort;
import com.poetry.poetry_backend.application.dashboard.usecase.GetDashboardOverviewUseCase;
import com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview;

class DashboardOverviewControllerTest {
  @Test
  void returnsOkWithPayload() {
    DashboardOverview model = new DashboardOverview(3, 2, 1, 5,
        "ui.dashboard.overview.highlight.default", "2025-09-28T00:00:00Z");
    DashboardOverviewQueryPort port = () -> Optional.of(model);
    GetDashboardOverviewUseCase useCase = new GetDashboardOverviewUseCase(port);
    DashboardOverviewController controller = new DashboardOverviewController(useCase);
  ResponseEntity<DashboardDto.DashboardOverviewResponse> response = controller.overview();
    assertEquals(200, response.getStatusCode().value());
    assertNotNull(response.getBody());
  }
}
