/*
 * File: AdminUserBootstrap.java
 * Purpose: Bootstrap component that ensures a default admin user exists on
 * application startup by invoking the registration use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.auth.exception.DuplicateUserException;
import com.poetry.poetry_backend.application.auth.usecase.RegisterUseCase;
import com.poetry.poetry_backend.domain.auth.model.Role;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

/** Ensures default admin user exists, repairing roles when already present. */
@Component
public class AdminUserBootstrap {
  private static final Logger log = LoggerFactory.getLogger(AdminUserBootstrap.class);
  private final RegisterUseCase registerUseCase;
  private final UserJpaRepository users;

  @Value("${admin.bootstrap.username:admin}")
  private String adminUsername;

  @Value("${admin.bootstrap.email:admin@example.com}")
  private String adminEmail;

  @Value("${admin.bootstrap.password:ChangeMe123!}")
  private String adminPassword;

  public AdminUserBootstrap(
      RegisterUseCase registerUseCase,
      UserJpaRepository users) {
    this.registerUseCase = registerUseCase;
    this.users = users;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    try {
      Map<String, Object> payload =
          Map.of("username", adminUsername, "email", adminEmail, "password", adminPassword);
      log.info("AdminUserBootstrap: invoking RegisterUseCase with username={}", adminUsername);
      registerUseCase.execute(payload);
      log.info("AdminUserBootstrap: admin user '{}' created successfully", adminUsername);
    } catch (DuplicateUserException duplicate) {
      log.info("AdminUserBootstrap: admin exists; repairing roles");
      ensureRoles();
    } catch (Exception e) {
      log.warn("AdminUserBootstrap: bootstrap failed: {}", e.toString());
      ensureRoles();
    }
  }

  private void ensureRoles() {
    users.findActiveByUsername(adminUsername).ifPresent(user -> {
      if (user.getRoles() == null || user.getRoles().isEmpty()) {
        user.setRoles(new HashSet<>(Set.of(Role.ADMIN.key())));
        users.save(user);
        log.info("AdminUserBootstrap: admin user '{}' roles repaired", adminUsername);
      }
    });
  }
}