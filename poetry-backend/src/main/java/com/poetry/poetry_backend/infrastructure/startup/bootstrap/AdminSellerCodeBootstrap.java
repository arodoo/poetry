/*
 * File: AdminSellerCodeBootstrap.java
 * Purpose: Bootstrap component that assigns one seller code to each of the
 * four seed users (admin + three managers). Runs after AdminUserBootstrap
 * so users are guaranteed to exist before codes are created.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.sellercode.usecase.CreateSellerCodeUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

/** Ensures each seed user has exactly one seller code. */
@Component
public class AdminSellerCodeBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(AdminSellerCodeBootstrap.class);
  private final UserJpaRepository users;
  private final CreateSellerCodeUseCase createSellerCode;
  private final SellerCodeJpaRepository sellerCodes;

  // username → seller code (must match AdminUserBootstrap seed usernames)
  private static final String[][] SEED_CODES = {
    {"admin",    "codigo001"},
    {"gerente1", "codigo002"},
    {"gerente2", "codigo003"},
    {"gerente3", "codigo004"}
  };

  @Value("${admin.bootstrap.username:admin}")
  private String adminUsername;

  public AdminSellerCodeBootstrap(
      UserJpaRepository users,
      CreateSellerCodeUseCase createSellerCode,
      SellerCodeJpaRepository sellerCodes) {
    this.users = users;
    this.createSellerCode = createSellerCode;
    this.sellerCodes = sellerCodes;
  }

  @EventListener(ApplicationReadyEvent.class)
  @Order(3)
  public void onApplicationReady() {
    for (String[] entry : SEED_CODES) {
      String username = entry[0];
      String code = entry[1];
      users.findActiveByUsername(username).ifPresent(user -> {
        boolean exists = sellerCodes.findAll().stream()
            .anyMatch(sc -> code.equals(sc.getCode()));
        if (!exists) {
          try {
            createSellerCode.execute(
                code, user.getId(), "ACTIVE");
            log.info("AdminSellerCodeBootstrap: '{}' -> '{}'",
                username, code);
          } catch (Exception e) {
            log.warn("AdminSellerCodeBootstrap: failed '{}': {}",
                code, e.toString());
          }
        }
      });
    }
  }
}
