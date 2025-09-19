/*
 * File: AdminBootstrap.java
 * Purpose: Bootstrap component that ensures a default admin user exists on
 * application startup by invoking the registration use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;


import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.auth.usecase.RegisterUseCase;


/**
 * Bootstrap component that ensures a default admin user exists by calling
 * the public register API on application startup. This exercises the full
 * controller -> application -> persistence registration flow.
 *
 * Configuration via properties (can be set as env vars):
 * - admin.bootstrap.username (default: admin)
 * - admin.bootstrap.email (default: admin@example.com)
 * - admin.bootstrap.password (default: ChangeMe123!)
 * - admin.bootstrap.base-url (default: http://localhost:8080)
 */
@Component
public class AdminBootstrap {

  private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);

  private final RegisterUseCase registerUseCase;

  @Value("${admin.bootstrap.username:admin}")
  private String adminUsername;

  @Value("${admin.bootstrap.email:admin@example.com}")
  private String adminEmail;

  @Value("${admin.bootstrap.password:ChangeMe123!}")
  private String adminPassword;

  public AdminBootstrap(RegisterUseCase registerUseCase) {
    this.registerUseCase = registerUseCase;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    try {
      Map<String, Object> payload = new HashMap<>();
      payload.put("username", adminUsername);
      payload.put("email", adminEmail);
      payload.put("password", adminPassword);

      log.info("AdminBootstrap: invoking RegisterUseCase with username={}", adminUsername);
  registerUseCase.execute(payload);
      log.info("AdminBootstrap: admin user '{}' created or returned successfully", adminUsername);
    } catch (Exception e) {
      log.warn("AdminBootstrap: failed to create admin user (continuing): {}", e.toString());
    }
  }
}
