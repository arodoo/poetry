/*
 * File: GetAllSubscriptionsUseCase.java
 * Purpose: Retrieve all subscription plans via the query port and apply
 * application-level filtering or sorting. Centralizes read logic so
 * controllers stay thin and mapping logic remains testable.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public class GetAllSubscriptionsUseCase {
  private final SubscriptionQueryPort query;

  public GetAllSubscriptionsUseCase(SubscriptionQueryPort query) {
    this.query = query;
  }

  public List<Subscription> execute() {
    return query.findAll();
  }
}
