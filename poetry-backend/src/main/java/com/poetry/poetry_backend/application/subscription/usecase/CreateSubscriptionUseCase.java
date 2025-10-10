/*
 * File: CreateSubscriptionUseCase.java
 * Purpose: Coordinate creation of new subscription plans by validating
 * input using domain rules and persisting via command port. Returns the
 * created domain object while isolating side-effects for testability.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.usecase;

import java.math.BigDecimal;
import java.util.Set;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionCommandPort;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public class CreateSubscriptionUseCase {
  private final SubscriptionCommandPort command;

  public CreateSubscriptionUseCase(SubscriptionCommandPort command) {
    this.command = command;
  }

  public Subscription execute(
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status) {
    return command.create(
        name,
        description,
        price,
        currency,
        durationDays,
        features,
        status);
  }
}
