/*
 * File: DashboardMutationController.java
 * Purpose: Mutation REST interface for dashboard creation and maintenance.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.dashboard.usecase.CreateDashboardUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.DeleteDashboardUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.UpdateDashboardUseCase;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;
import com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDto.CreateDashboardRequest;
import com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDto.DashboardResponse;
import com.poetry.poetry_backend.interfaces.v1.dashboard.DashboardDto.UpdateDashboardRequest;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardMutationController {
  private final CreateDashboardUseCase create;
  private final UpdateDashboardUseCase update;
  private final DeleteDashboardUseCase delete;

  public DashboardMutationController(
      CreateDashboardUseCase create, UpdateDashboardUseCase update, DeleteDashboardUseCase delete) {
    this.create = create;
    this.update = update;
    this.delete = delete;
  }

  @PostMapping
  public ResponseEntity<DashboardResponse> createDashboard(
      @RequestBody CreateDashboardRequest request) {
    Dashboard created = create.execute(request.name(), request.slug(), request.description());
    java.net.URI location = java.net.URI.create("/api/v1/dashboard/" + created.id());
    return ResponseEntity.created(location)
        .body(DashboardDto.toDashboardResponse(created));
  }

  @PutMapping("/{id}")
  public DashboardResponse updateDashboard(
      @PathVariable Long id, @RequestBody UpdateDashboardRequest request) {
    Dashboard updated = update.execute(id, request.name(), request.slug(), request.description());
    return DashboardDto.toDashboardResponse(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteDashboard(@PathVariable Long id) {
    delete.execute(id);
    return ResponseEntity.noContent().build();
  }
}
