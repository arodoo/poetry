/*
 * File: SubscriptionPlanBootstrap.java
 * Purpose: Bootstrap component that injects sample subscription plans
 * on application startup for testing and demonstration.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import java.math.BigDecimal;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.subscription.usecase.CreateSubscriptionUseCase;

/** Injects 20 sample subscription plans on startup. */
@Component
public class SubscriptionPlanBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(SubscriptionPlanBootstrap.class);
  private final CreateSubscriptionUseCase createSubscription;

  public SubscriptionPlanBootstrap(
      CreateSubscriptionUseCase createSubscription) {
    this.createSubscription = createSubscription;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    try {
      log.info("SubscriptionPlanBootstrap: injecting 20 plans");
      injectSamplePlans();
      log.info("SubscriptionPlanBootstrap: injection complete");
    } catch (Exception e) {
      log.warn("SubscriptionPlanBootstrap: failed: {}", e.toString());
    }
  }

  private void injectSamplePlans() {
    String[][] plans = {
      {"Basic Monthly", "Essential features", "9.99", "USD", "30"},
      {"Pro Monthly", "Advanced features", "29.99", "USD", "30"},
      {"Enterprise Monthly", "Full suite", "99.99", "USD", "30"},
      {"Basic Yearly", "Annual basic", "99.00", "USD", "365"},
      {"Pro Yearly", "Annual pro", "299.00", "USD", "365"},
      {"Starter Weekly", "Try it out", "2.99", "USD", "7"},
      {"Student Monthly", "For students", "4.99", "USD", "30"},
      {"Team Monthly", "For small teams", "49.99", "USD", "30"},
      {"Premium Monthly", "Premium access", "59.99", "USD", "30"},
      {"Lifetime", "One-time payment", "999.00", "USD", "36500"},
      {"Quarterly Basic", "3-month basic", "24.99", "USD", "90"},
      {"Quarterly Pro", "3-month pro", "79.99", "USD", "90"},
      {"Freelancer", "For freelancers", "19.99", "USD", "30"},
      {"Agency", "For agencies", "199.99", "USD", "30"},
      {"Nonprofit", "Nonprofit discount", "14.99", "USD", "30"},
      {"Education", "Education plan", "9.99", "USD", "30"},
      {"Developer", "Developer tools", "39.99", "USD", "30"},
      {"Business", "Business tier", "149.99", "USD", "30"},
      {"Platinum", "Platinum access", "499.99", "USD", "30"},
      {"Trial", "30-day trial", "0.00", "USD", "30"}
    };

    for (int i = 0; i < plans.length; i++) {
      String[] p = plans[i];
      try {
        createSubscription.execute(
            p[0], p[1], new BigDecimal(p[2]), p[3],
            Integer.parseInt(p[4]), Set.of(), "active");
      } catch (Exception e) {
        log.debug("Plan '{}' exists or failed: {}", p[0], e.toString());
      }
    }
  }
}
