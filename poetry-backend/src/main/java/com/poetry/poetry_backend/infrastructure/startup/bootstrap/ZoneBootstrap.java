/*
 * File: ZoneBootstrap.java
 * Purpose: Bootstrap component that creates a single default zone on
 * application startup. The zone is assigned to the admin user as manager
 * and serves as the baseline geographic unit for the system.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.zone.usecase.CreateZoneUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

/** Creates one default zone on startup if none exists. */
@Component
public class ZoneBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(ZoneBootstrap.class);
  private final CreateZoneUseCase createZone;
  private final UserJpaRepository users;
  private final ZoneJpaRepository zones;

  @Value("${admin.bootstrap.username:admin}")
  private String adminUsername;

  public ZoneBootstrap(
      CreateZoneUseCase createZone,
      UserJpaRepository users,
      ZoneJpaRepository zones) {
    this.createZone = createZone;
    this.users = users;
    this.zones = zones;
  }

  @EventListener(ApplicationReadyEvent.class)
  @Order(4)
  public void onApplicationReady() {
    if (zones.count() > 0) {
      log.info("ZoneBootstrap: zone already exists, skip");
      return;
    }

    List<UserEntity> activeUsers = users.findAll();
    if (activeUsers.isEmpty()) {
      log.warn("ZoneBootstrap: no users found, cannot create zone");
      return;
    }

    Long managerId = users.findActiveByUsername(adminUsername)
        .map(UserEntity::getId)
        .orElseGet(() -> activeUsers.get(0).getId());

    try {
      createZone.execute("Zona Principal", "Zona operativa principal", managerId);
      log.info("ZoneBootstrap: 'Zona Principal' created");
    } catch (Exception e) {
      log.warn("ZoneBootstrap: failed: {}", e.toString());
    }
  }
}
