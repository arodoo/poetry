/*
 * File: ZoneComposition.java
 * Purpose: Spring configuration wiring zone adapters and use cases as
 * beans following composition root pattern. Centralizes dependency
 * injection for the zone feature ensuring clean architecture boundaries.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.zone;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.zone.port.ZoneCommandPort;
import com.poetry.poetry_backend.application.zone.port.ZoneQueryPort;
import com.poetry.poetry_backend.application.zone.usecase.*;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

@Configuration
public class ZoneComposition {
  @Bean
  ZoneJpaAdapter zoneJpaAdapter(ZoneJpaRepository repo) {
    return new ZoneJpaAdapter(repo);
  }

  @Bean
  GetAllZonesUseCase getAllZonesUseCase(ZoneQueryPort q) {
    return new GetAllZonesUseCase(q);
  }

  @Bean
  GetZonesPageUseCase getZonesPageUseCase(ZoneQueryPort q) {
    return new GetZonesPageUseCase(q);
  }

  @Bean
  GetZoneByIdUseCase getZoneByIdUseCase(ZoneQueryPort q) {
    return new GetZoneByIdUseCase(q);
  }

  @Bean
  CreateZoneUseCase createZoneUseCase(ZoneCommandPort c) {
    return new CreateZoneUseCase(c);
  }

  @Bean
  UpdateZoneUseCase updateZoneUseCase(ZoneCommandPort c) {
    return new UpdateZoneUseCase(c);
  }

  @Bean
  DeleteZoneUseCase deleteZoneUseCase(ZoneCommandPort c) {
    return new DeleteZoneUseCase(c);
  }
}
