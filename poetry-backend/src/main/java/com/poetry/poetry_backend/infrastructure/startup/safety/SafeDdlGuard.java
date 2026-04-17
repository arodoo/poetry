/*
 * File: SafeDdlGuard.java
 * Purpose: Startup safety guard that refuses to boot the
 * application when the active profile is desktop or prod and
 * Hibernate is configured with a destructive ddl-auto value.
 * This prevents a deployment mistake from wiping client data.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.safety;

import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@Profile({"desktop", "prod"})
public class SafeDdlGuard {

  private static final Set<String> SAFE =
      Set.of("update", "validate", "none");

  @Value("${spring.jpa.hibernate.ddl-auto:update}")
  private String ddlAuto;

  @PostConstruct
  void verify() {
    String value = ddlAuto == null ? "" : ddlAuto.trim();
    if (!SAFE.contains(value.toLowerCase())) {
      throw new IllegalStateException(
          "Refusing to start: ddl-auto='" + value
              + "' would destroy client data. Allowed: "
              + SAFE);
    }
  }
}
