/*
 * File: SubscriptionCommandPort.java
 * Purpose: Define commands for subscription plan lifecycle and mutations
 * used by application layer. This port exposes create, update and soft-
 * delete operations while shielding application logic from persistence.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.port;

import java.math.BigDecimal;
import java.util.Set;

import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public interface SubscriptionCommandPort {
  Subscription create(
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status);

  Subscription update(
      Long id,
      long version,
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status);

  void softDelete(Long id, long version);
}
