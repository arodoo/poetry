/*
 * File: SubscriptionJpaCommandSupport.java
 * Purpose: Shared helpers for subscription command adapter logic including
 * validation guards and persistence operations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.subscription;

import com.poetry.poetry_backend.domain.subscription.exception.SubscriptionNotFoundException;
import com.poetry.poetry_backend.domain.subscription.exception.SubscriptionVersionMismatchException;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

final class SubscriptionJpaCommandSupport {
  private SubscriptionJpaCommandSupport() {}

  static SubscriptionEntity guard(
      SubscriptionJpaRepository repository,
      Long id,
      long version) {
    SubscriptionEntity entity =
        repository.findById(id)
            .orElseThrow(() -> new SubscriptionNotFoundException(id));
    Long currentVersion = entity.getVersion();
    if (currentVersion != null && !currentVersion.equals(version)) {
      throw new SubscriptionVersionMismatchException(id);
    }
    return entity;
  }

  static Subscription persist(
      SubscriptionJpaRepository repository,
      SubscriptionEntity entity) {
    return SubscriptionJpaMapper.toDomain(repository.save(entity));
  }
}
