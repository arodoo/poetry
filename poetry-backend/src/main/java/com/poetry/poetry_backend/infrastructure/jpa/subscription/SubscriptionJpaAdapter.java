/*
 * File: SubscriptionJpaAdapter.java
 * Purpose: Main adapter delegating to query and command adapters for
 * subscription operations. Implements both port interfaces.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.subscription;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionCommandPort;
import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

@Transactional
public class SubscriptionJpaAdapter
    implements SubscriptionQueryPort, SubscriptionCommandPort {
  private final SubscriptionJpaQueryAdapter queryAdapter;
  private final SubscriptionJpaCommandAdapter commandAdapter;

  public SubscriptionJpaAdapter(SubscriptionJpaRepository repo) {
    this.queryAdapter = new SubscriptionJpaQueryAdapter(repo);
    this.commandAdapter = new SubscriptionJpaCommandAdapter(repo);
  }

  public List<Subscription> findAll() {
    return queryAdapter.findAll();
  }

  public PageResult<Subscription> findAllPaged(
      int page,
      int size,
      String search) {
    return queryAdapter.findAllPaged(page, size, search);
  }

  public Subscription findById(Long id) {
    return queryAdapter.findById(id);
  }

  public Subscription create(
      String name,
      String description,
      BigDecimal price,
      String currency,
      Integer durationDays,
      Set<String> features,
      String status) {
    return commandAdapter.create(
        name, description, price, currency, durationDays, features, status);
  }

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
    return commandAdapter.update(
        id, version, name, description, price, currency,
        durationDays, features, status);
  }

  public void softDelete(Long id, long version) {
    commandAdapter.softDelete(id, version);
  }
}
