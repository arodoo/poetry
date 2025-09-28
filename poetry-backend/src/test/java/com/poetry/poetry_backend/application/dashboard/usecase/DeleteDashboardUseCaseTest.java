/*
 * File: DeleteDashboardUseCaseTest.java
 * Purpose: Ensure delete delegates when dashboard exists.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardCommandPort;
import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

class DeleteDashboardUseCaseTest {
  @Test void deletesExistingDashboard() {
    DashboardQueryPort query = new DashboardQueryPort() {
      @Override public List<Dashboard> findAll() { return List.of(); }
      @Override public Optional<Dashboard> findById(Long id) {
        return Optional.of(new Dashboard(id, "Main", "main", null, null));
      }
    };
    AtomicBoolean deleted = new AtomicBoolean(false);
    DashboardCommandPort command = new DashboardCommandPort() {
      @Override public Dashboard save(Dashboard dashboard) { return dashboard; }
      @Override public void deleteById(Long id) { deleted.set(true); }
      @Override public boolean existsBySlug(String slug) { return false; }
    };
    new DeleteDashboardUseCase(query, command).execute(1L);
    assertTrue(deleted.get());
  }
}
