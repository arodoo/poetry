/*
 * File: DevManagerBootstrap.java
 * Purpose: Seeds three manager users (gerente1-3) on startup when the dev
 * profile is active. Never runs in prod or desktop profiles, ensuring the
 * production database is never polluted with demo accounts.
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
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.auth.exception.DuplicateUserException;
import com.poetry.poetry_backend.application.auth.usecase.session.RegisterUseCase;
import com.poetry.poetry_backend.domain.auth.model.Role;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

/** Seeds manager demo users — dev profile only. */
@Component
@Profile("dev")
public class DevManagerBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(DevManagerBootstrap.class);
  private static final String[][] MANAGERS = {
    {"gerente1", "gerente1@example.com"},
    {"gerente2", "gerente2@example.com"},
    {"gerente3", "gerente3@example.com"}
  };

  private final RegisterUseCase registerUseCase;
  private final UserJpaRepository users;

  @Value("${admin.bootstrap.password:ChangeMe123!}")
  private String defaultPassword;

  public DevManagerBootstrap(
      RegisterUseCase registerUseCase,
      UserJpaRepository users) {
    this.registerUseCase = registerUseCase;
    this.users = users;
  }

  @EventListener(ApplicationReadyEvent.class)
  @Order(2)
  public void onApplicationReady() {
    for (String[] m : MANAGERS) {
      seed(m[0], m[1]);
    }
  }

  private void seed(String username, String email) {
    try {
      registerUseCase.execute(Map.of(
          "username", username,
          "email", email,
          "password", defaultPassword));
      log.info("DevManagerBootstrap: '{}' created", username);
    } catch (DuplicateUserException ignored) {
      log.info("DevManagerBootstrap: '{}' already exists", username);
    } catch (Exception e) {
      log.warn("DevManagerBootstrap: '{}' failed: {}", username,
          e.toString());
    }
    ensureManagerRole(username);
  }

  private void ensureManagerRole(String username) {
    users.findActiveByUsername(username).ifPresent(user -> {
      Set<String> roles = new HashSet<>();
      roles.add(Role.MANAGER.key());
      user.setRoles(roles);
      users.save(user);
    });
  }
}
