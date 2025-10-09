/*
 * File: ZoneBootstrap.java
 * Purpose: Bootstrap component that creates sample zones on application
 * startup for testing and development purposes. Injects 20 zones with
 * the first active user as manager to populate the zones list.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.zone.usecase.CreateZoneUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

@Component
public class ZoneBootstrap {
  private static final Logger log =
    LoggerFactory.getLogger(ZoneBootstrap.class);
  private final CreateZoneUseCase createZone;
  private final UserJpaRepository users;
  private final ZoneJpaRepository zones;

  @Value("${zone.bootstrap.enabled:true}")
  private boolean enabled;

  @Value("${zone.bootstrap.count:20}")
  private int zoneCount;

  public ZoneBootstrap(
      CreateZoneUseCase createZone,
      UserJpaRepository users,
      ZoneJpaRepository zones) {
    this.createZone = createZone;
    this.users = users;
    this.zones = zones;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    if (!enabled) {
      log.info("ZoneBootstrap: disabled via config");
      return;
    }

    long existing = zones.count();
    if (existing >= zoneCount) {
      log.info("ZoneBootstrap: {} zones exist, skip", existing);
      return;
    }

    List<UserEntity> activeUsers = users.findAll();
    if (activeUsers.isEmpty()) {
      log.warn("ZoneBootstrap: no users found, cannot create zones");
      return;
    }

    Long managerId = activeUsers.get(0).getId();
    log.info("ZoneBootstrap: creating {} zones with manager ID {}",
      zoneCount, managerId);

    for (int i = 1; i <= zoneCount; i++) {
      try {
        String name = String.format("Zone-%02d", i);
        String description = String.format(
          "Sample zone %d for testing and development", i);
        createZone.execute(name, description, managerId);
        Thread.sleep(10);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        log.warn("ZoneBootstrap: interrupted during zone creation");
        break;
      } catch (Exception e) {
        log.debug("ZoneBootstrap: failed creating zone {}: {}",
          i, e.toString());
      }
    }

    log.info("ZoneBootstrap: sample zones creation complete");
  }
}
