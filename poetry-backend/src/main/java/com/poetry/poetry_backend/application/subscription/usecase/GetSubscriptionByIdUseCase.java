/*
 * File: GetSubscriptionByIdUseCase.java
 * Purpose: Retrieve a single subscription plan by ID via the query port.
 * Enforces not-found semantics and decouples controller from persistence.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.usecase;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public class GetSubscriptionByIdUseCase {
  private final SubscriptionQueryPort query;

  public GetSubscriptionByIdUseCase(SubscriptionQueryPort query) {
    this.query = query;
  }

  public Subscription execute(Long id) {
    return query.findById(id);
  }
}
