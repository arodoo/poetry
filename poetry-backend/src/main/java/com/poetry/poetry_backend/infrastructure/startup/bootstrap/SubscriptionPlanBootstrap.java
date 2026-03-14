/*
 * File: SubscriptionPlanBootstrap.java
 * Purpose: Idempotent bootstrap that seeds the five official subscription
 * plans on startup. Uses existsByName to skip existing plans without
 * triggering duplicate-key errors or noisy SQL exceptions in the log.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import java.math.BigDecimal;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.subscription.usecase.CreateSubscriptionUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;

/** Idempotent seeder for the five official subscription plans. */
@Component
public class SubscriptionPlanBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(SubscriptionPlanBootstrap.class);

  private final CreateSubscriptionUseCase createSubscription;
  private final SubscriptionJpaRepository repo;

  // name, description, price, currency, durationDays
  private static final String[][] PLANS = {
    {"Basica Mensual",    "Acceso basico mensual",    "9.99",  "USD", "30"},
    {"Premium Mensual",   "Acceso premium mensual",   "29.99", "USD", "30"},
    {"Dominical Mensual", "Acceso dominical mensual", "14.99", "USD", "30"},
    {"Anual Ilimitada",   "Acceso ilimitado anual",   "199.99","USD", "365"},
    {"Ilimitada", "Acceso ilimitado hasta 2100", "999.00", "USD", "27010"}
  };

  public SubscriptionPlanBootstrap(
      CreateSubscriptionUseCase createSubscription,
      SubscriptionJpaRepository repo) {
    this.createSubscription = createSubscription;
    this.repo = repo;
  }

  @EventListener(ApplicationReadyEvent.class)
  @Order(2)
  public void onApplicationReady() {
    log.info("SubscriptionPlanBootstrap: injecting {} plans", PLANS.length);
    for (String[] p : PLANS) {
      if (repo.existsByName(p[0])) {
        log.debug("SubscriptionPlanBootstrap: '{}' exists, skip", p[0]);
        continue;
      }
      createSubscription.execute(
          p[0], p[1], new BigDecimal(p[2]), p[3],
          Integer.parseInt(p[4]), Set.of(), "active");
      log.info("SubscriptionPlanBootstrap: created '{}'", p[0]);
    }
    log.info("SubscriptionPlanBootstrap: injection complete");
  }
}
