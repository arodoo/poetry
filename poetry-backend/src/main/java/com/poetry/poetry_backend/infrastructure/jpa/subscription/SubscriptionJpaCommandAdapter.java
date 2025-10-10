/*
 * File: SubscriptionJpaCommandAdapter.java
 * Purpose: Handles subscription command operations for create, update and
 * soft-delete with optimistic locking support.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.subscription;

import static com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaCommandSupport.guard;
import static com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaCommandSupport.persist;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionCommandPort;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public class SubscriptionJpaCommandAdapter
    implements SubscriptionCommandPort {
  private final SubscriptionJpaRepository repository;

  public SubscriptionJpaCommandAdapter(
      SubscriptionJpaRepository repository) {
    this.repository = repository;
  }

  @Override
  public Subscription create(
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status) {
    SubscriptionEntity entity = new SubscriptionEntity();
    entity.setName(name);
    entity.setDescription(description);
    entity.setPrice(price);
    entity.setCurrency(currency != null ? currency : "USD");
    entity.setDurationDays(durationDays);
    entity.setFeatures(features);
    entity.setStatus(status != null ? status : "active");
    return persist(repository, entity);
  }

  @Override
  public Subscription update(
      Long id,
      long version,
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status) {
    SubscriptionEntity entity = guard(repository, id, version);
    entity.setName(name);
    entity.setDescription(description);
    entity.setPrice(price);
    entity.setCurrency(currency);
    entity.setDurationDays(durationDays);
    entity.setFeatures(features);
    entity.setStatus(status);
    return persist(repository, entity);
  }

  @Override
  public void softDelete(Long id, long version) {
    SubscriptionEntity entity = guard(repository, id, version);
    entity.setStatus("inactive");
    entity.setDeletedAt(Instant.now());
    repository.save(entity);
  }
}
