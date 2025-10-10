/*
 * File: UpdateSubscriptionUseCase.java
 * Purpose: Coordinate subscription plan updates by validating input and
 * delegating to the command port with optimistic locking. Keeps update
 * logic testable and isolated from persistence details.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.usecase;

import java.math.BigDecimal;
import java.util.Set;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionCommandPort;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public class UpdateSubscriptionUseCase {
  private final SubscriptionCommandPort command;

  public UpdateSubscriptionUseCase(SubscriptionCommandPort command) {
    this.command = command;
  }

  public Subscription execute(
      Long id,
      long version,
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status) {
    return command.update(
        id,
        version,
        name,
        description,
        price,
        currency,
        durationDays,
        features,
        status);
  }
}
