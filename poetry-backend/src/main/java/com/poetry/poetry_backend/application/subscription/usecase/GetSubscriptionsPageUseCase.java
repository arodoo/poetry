/*
 * File: GetSubscriptionsPageUseCase.java
 * Purpose: Retrieve paginated subscription plans with optional search filter.
 * Improves performance by avoiding full table scans on large datasets.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.usecase;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public class GetSubscriptionsPageUseCase {
  private final SubscriptionQueryPort query;

  public GetSubscriptionsPageUseCase(SubscriptionQueryPort query) {
    this.query = query;
  }

  public PageResult<Subscription> execute(
      int page,
      int size,
      String search) {
    return query.findAllPaged(page, size, search);
  }
}
