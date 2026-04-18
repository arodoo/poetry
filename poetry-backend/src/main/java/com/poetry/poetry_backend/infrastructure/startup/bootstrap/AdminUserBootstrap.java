/*
 * File: AdminUserBootstrap.java
 * Purpose: Ensures the default admin user exists on every startup.
 * Idempotent — skips silently when admin already exists and repairs
 * role assignment if missing.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.auth.exception.DuplicateUserException;
import com.poetry.poetry_backend.application.auth.usecase.session.RegisterUseCase;
import com.poetry.poetry_backend.domain.auth.model.Role;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

/** Ensures the admin user exists on startup (all profiles). */
@Component
public class AdminUserBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(AdminUserBootstrap.class);
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
  @Order(1)
  public void onApplicationReady() {
    Map<String, Object> payload = Map.of(
        "username", adminUsername,
        "email", adminEmail,
        "password", adminPassword);
    try {
      registerUseCase.execute(payload);
      log.info("AdminUserBootstrap: admin '{}' created", adminUsername);
    } catch (DuplicateUserException d) {
      log.info("AdminUserBootstrap: admin exists; repairing role");
      repairAdminRole();
    } catch (Exception e) {
      log.warn("AdminUserBootstrap: admin creation failed: {}",
          e.toString());
      repairAdminRole();
    }
  }

  private void repairAdminRole() {
    users.findActiveByUsername(adminUsername).ifPresent(user -> {
      Set<String> roles = new HashSet<>(
          user.getRoles() == null ? Set.of() : user.getRoles());
      if (roles.add(Role.ADMIN.key())) {
        users.save(user);
        log.info("AdminUserBootstrap: ADMIN role repaired for '{}'",
            adminUsername);
      }
    });
  }
}
