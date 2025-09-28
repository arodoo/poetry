/*
 * File: DashboardOverviewComposition.java
 * Purpose: Wire dashboard overview query dependencies.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.dashboard;

import java.time.Clock;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.dashboard.port.DashboardOverviewQueryPort;
import com.poetry.poetry_backend.application.dashboard.usecase.GetDashboardOverviewUseCase;
import com.poetry.poetry_backend.infrastructure.memory.dashboard.StaticDashboardOverviewAdapter;

@Configuration
public class DashboardOverviewComposition {
  @Bean
  Clock dashboardClock() {
    return Clock.systemUTC();
  }

  @Bean
  DashboardOverviewQueryPort dashboardOverviewQueryPort(Clock dashboardClock) {
    return new StaticDashboardOverviewAdapter(dashboardClock);
  }

  @Bean
  GetDashboardOverviewUseCase getDashboardOverviewUseCase(
      DashboardOverviewQueryPort queryPort) {
    return new GetDashboardOverviewUseCase(queryPort);
  }
}
