/*
 * File: AdminUserBootstrap.java
 * Purpose: Bootstrap component that ensures a default admin user and three
 * manager users exist on application startup. Invokes the registration use
 * case for each and repairs roles when users already exist.
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

/** Ensures admin + 3 manager users exist on startup. */
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

  // Fixed manager seeds: username, email
  private static final String[][] MANAGERS = {
    {"gerente1", "gerente1@example.com"},
    {"gerente2", "gerente2@example.com"},
    {"gerente3", "gerente3@example.com"}
  };

  public AdminUserBootstrap(
      RegisterUseCase registerUseCase,
      UserJpaRepository users) {
    this.registerUseCase = registerUseCase;
    this.users = users;
  }

  @EventListener(ApplicationReadyEvent.class)
  @Order(1)
  public void onApplicationReady() {
    createAdmin();
    createManagers();
  }

  private void createAdmin() {
    Map<String, Object> payload = Map.of(
        "username", adminUsername,
        "email", adminEmail,
        "password", adminPassword);
    try {
      registerUseCase.execute(payload);
      log.info("AdminUserBootstrap: admin '{}' created", adminUsername);
    } catch (DuplicateUserException d) {
      log.info("AdminUserBootstrap: admin exists; repairing roles");
      ensureRole(adminUsername, Role.ADMIN.key());
    } catch (Exception e) {
      log.warn("AdminUserBootstrap: admin creation failed: {}", e.toString());
      ensureRole(adminUsername, Role.ADMIN.key());
    }
  }

  private void createManagers() {
    for (String[] m : MANAGERS) {
      String username = m[0];
      String email = m[1];
      Map<String, Object> payload = Map.of(
          "username", username,
          "email", email,
          "password", adminPassword);
      try {
        registerUseCase.execute(payload);
        log.info("AdminUserBootstrap: manager '{}' created", username);
      } catch (DuplicateUserException d) {
        log.info("AdminUserBootstrap: manager '{}' exists", username);
      } catch (Exception e) {
        log.warn("AdminUserBootstrap: manager '{}' failed: {}",
            username, e.toString());
      }
      ensureRole(username, Role.MANAGER.key());
    }
  }

  private void ensureRole(String username, String role) {
    users.findActiveByUsername(username).ifPresent(user -> {
      if (user.getRoles() == null || !user.getRoles().contains(role)) {
        Set<String> roles = new HashSet<>(
            user.getRoles() == null ? Set.of() : user.getRoles());
        roles.add(role);
        user.setRoles(roles);
        users.save(user);
        log.info("AdminUserBootstrap: role '{}' set for '{}'",
            role, username);
      }
    });
  }
}
