/*
 * File: AdminSellerCodeBootstrap.java
 * Purpose: Bootstrap component that ensures admin user has a default seller code.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.sellercode.usecase.CreateSellerCodeUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

/** Ensures admin user has a default seller code on startup. */
@Component
public class AdminSellerCodeBootstrap {
  private static final Logger log = LoggerFactory.getLogger(AdminSellerCodeBootstrap.class);
  private final UserJpaRepository users;
  private final CreateSellerCodeUseCase createSellerCode;
  private final SellerCodeJpaRepository sellerCodes;

  @Value("${admin.bootstrap.username:admin}")
  private String adminUsername;

  @Value("${admin.bootstrap.injectSampleUsers:false}")
  private boolean injectSampleUsers;

  public AdminSellerCodeBootstrap(
      UserJpaRepository users,
      CreateSellerCodeUseCase createSellerCode,
      SellerCodeJpaRepository sellerCodes) {
    this.users = users;
    this.createSellerCode = createSellerCode;
    this.sellerCodes = sellerCodes;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    ensureAdminSellerCode();
    if (injectSampleUsers) {
      ensureSellerCodesForAllUsers();
    }
  }

  private void ensureAdminSellerCode() {
    users.findActiveByUsername(adminUsername).ifPresent(user -> {
      String defaultCode = "ADMIN-SC-001";
      if (sellerCodes.findAll().stream()
          .noneMatch(sc -> defaultCode.equals(sc.getCode()))) {
        try {
          createSellerCode.execute(defaultCode, "default-org", user.getId(), "active");
          log.info("AdminSellerCodeBootstrap: seller code '{}' created for admin", defaultCode);
        } catch (Exception e) {
          log.warn("AdminSellerCodeBootstrap: failed to create seller code: {}", e.toString());
        }
      }
    });
  }

  private void ensureSellerCodesForAllUsers() {
    try {
      users.findAllActive().forEach(user -> {
        // Use user id to make a stable, unique seller code per user
        String code = String.format("USER-SC-%05d", user.getId());
        boolean exists = sellerCodes.findAll().stream().anyMatch(sc -> code.equals(sc.getCode()));
        if (!exists) {
          try {
            createSellerCode.execute(code, "default-org", user.getId(), "active");
            log.info("AdminSellerCodeBootstrap: seller code '{}' created for user {}", code, user.getId());
          } catch (Exception e) {
            log.warn("AdminSellerCodeBootstrap: failed to create seller code {} for user {}: {}", code, user.getId(), e.toString());
          }
        }
      });
    } catch (Exception e) {
      log.warn("AdminSellerCodeBootstrap: failed ensuring seller codes for users: {}", e.toString());
    }
  }
}