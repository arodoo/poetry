/*
 * File: DashboardComposition.java
 * Purpose: Wire CRUD dependencies for the dashboard module.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.dashboard;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.dashboard.port.DashboardCommandPort;
import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.application.dashboard.usecase.CreateDashboardUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.DeleteDashboardUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.GetAllDashboardsUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.GetDashboardByIdUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.UpdateDashboardUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.dashboard.DashboardJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.dashboard.DashboardJpaRepository;

@Configuration
public class DashboardComposition {
  @Bean
  DashboardJpaAdapter dashboardJpaAdapter(DashboardJpaRepository repository) {
    return new DashboardJpaAdapter(repository);
  }

  @Bean
  GetAllDashboardsUseCase getAllDashboardsUseCase(DashboardQueryPort queryPort) {
    return new GetAllDashboardsUseCase(queryPort);
  }

  @Bean
  GetDashboardByIdUseCase getDashboardByIdUseCase(DashboardQueryPort queryPort) {
    return new GetDashboardByIdUseCase(queryPort);
  }

  @Bean
  CreateDashboardUseCase createDashboardUseCase(DashboardCommandPort commandPort) {
    return new CreateDashboardUseCase(commandPort);
  }

  @Bean
  UpdateDashboardUseCase updateDashboardUseCase(
      DashboardQueryPort queryPort, DashboardCommandPort commandPort) {
    return new UpdateDashboardUseCase(queryPort, commandPort);
  }

  @Bean
  DeleteDashboardUseCase deleteDashboardUseCase(
      DashboardQueryPort queryPort, DashboardCommandPort commandPort) {
    return new DeleteDashboardUseCase(queryPort, commandPort);
  }
}
