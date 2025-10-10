/*
 * File: SubscriptionJpaMapper.java
 * Purpose: Mapping helper to convert JPA SubscriptionEntity instances to
 * domain Subscription models. Isolates mapping logic from adapters so that
 * adapters focus on repository interactions. Keeps conversion reusable.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.subscription;

import com.poetry.poetry_backend.domain.subscription.model.Subscription;
import com.poetry.poetry_backend.domain.subscription.model.SubscriptionRehydrator;

public final class SubscriptionJpaMapper {
  private SubscriptionJpaMapper() {
    // utility
  }

  public static Subscription toDomain(SubscriptionEntity e) {
    return SubscriptionRehydrator.rehydrate(
        e.getId(),
        e.getName(),
        e.getDescription(),
        e.getPrice(),
        e.getCurrency(),
        e.getDurationDays(),
        e.getFeatures(),
        e.getStatus(),
        e.getCreatedAt(),
        e.getUpdatedAt(),
        e.getDeletedAt(),
        e.getVersion() == null ? 0L : e.getVersion());
  }
}
