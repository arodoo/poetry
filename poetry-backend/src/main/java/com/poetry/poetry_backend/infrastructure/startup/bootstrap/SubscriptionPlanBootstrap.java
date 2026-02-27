/*
 * File: SubscriptionPlanBootstrap.java
 * Purpose: Bootstrap component that injects the five official subscription
 * plans on application startup. Plans represent real business tiers rather
 * than sample data, so they are recreated on every fresh start.
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

/** Injects the five official subscription plans on startup. */
@Component
public class SubscriptionPlanBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(SubscriptionPlanBootstrap.class);
  private final CreateSubscriptionUseCase createSubscription;

  // name, description, price, currency, durationDays
  // "Ilimitada" uses ~27 010 days to reach year 2100 from 2026
  private static final String[][] PLANS = {
    {"Basica Mensual",    "Acceso basico mensual",      "9.99",  "USD", "30"},
    {"Premium Mensual",   "Acceso premium mensual",     "29.99", "USD", "30"},
    {"Dominical Mensual", "Acceso dominical mensual",   "14.99", "USD", "30"},
    {"Anual Ilimitada",   "Acceso ilimitado anual",     "199.99","USD", "365"},
    {"Ilimitada",         "Acceso ilimitado hasta 2100","999.00","USD", "27010"}
  };

  public SubscriptionPlanBootstrap(
      CreateSubscriptionUseCase createSubscription) {
    this.createSubscription = createSubscription;
  }

  @EventListener(ApplicationReadyEvent.class)
  @Order(2)
  public void onApplicationReady() {
    try {
      log.info("SubscriptionPlanBootstrap: injecting {} plans", PLANS.length);
      for (String[] p : PLANS) {
        try {
          createSubscription.execute(
              p[0], p[1], new BigDecimal(p[2]), p[3],
              Integer.parseInt(p[4]), Set.of(), "active");
          log.info("SubscriptionPlanBootstrap: created '{}'", p[0]);
        } catch (Exception e) {
          log.debug("Plan '{}' skipped: {}", p[0], e.toString());
        }
      }
      log.info("SubscriptionPlanBootstrap: injection complete");
    } catch (Exception e) {
      log.warn("SubscriptionPlanBootstrap: failed: {}", e.toString());
    }
  }
}
