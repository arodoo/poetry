/*
 * File: DashboardControllerTest.java
 * Purpose: Validate dashboard query controller responses.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dashboard;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.application.dashboard.usecase.GetAllDashboardsUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.GetDashboardByIdUseCase;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;
import com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDto.DashboardResponse;

class DashboardControllerTest {
  private static final class QueryStub implements DashboardQueryPort {
    private final Dashboard dashboard = new Dashboard(1L, "Main", "main", null, null);
    @Override
    public java.util.List<Dashboard> findAll() {
      return java.util.List.of(dashboard);
    }

    @Override
    public java.util.Optional<Dashboard> findById(Long id) {
      return java.util.Optional.of(dashboard);
    }
  }
  private DashboardController controller() {
    QueryStub stub = new QueryStub();
    return new DashboardController(
        new GetAllDashboardsUseCase(stub),
        new GetDashboardByIdUseCase(stub)
    );
  }
  @Test void returnsDashboardsWithEtag() {
    var response = controller().getDashboards();
    java.util.List<DashboardResponse> body = response.getBody();
    Assertions.assertNotNull(body);
    Assertions.assertEquals(1, body.size());
    Assertions.assertNotNull(response.getHeaders().getETag());
  }
  @Test void returnsSingleDashboard() {
    DashboardResponse response = controller().getDashboard(1L);
    Assertions.assertEquals(1L, response.id());
  }
}
