/*
 * File: SubscriptionJpaQueryAdapter.java
 * Purpose: Handles subscription query operations with pagination support.
 * Maps JPA entities to domain models and enforces not-found semantics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.subscription;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.subscription.exception.SubscriptionNotFoundException;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public class SubscriptionJpaQueryAdapter
    implements SubscriptionQueryPort {
  private final SubscriptionJpaRepository repo;

  public SubscriptionJpaQueryAdapter(SubscriptionJpaRepository repo) {
    this.repo = repo;
  }

  public List<Subscription> findAll() {
    return repo.findAllActive().stream()
        .map(SubscriptionJpaMapper::toDomain)
        .toList();
  }

  public PageResult<Subscription> findAllPaged(
      int page,
      int size,
      String search) {
    Pageable pageable = PageRequest.of(page, size);
    Page<SubscriptionEntity> pageResult =
        (search == null || search.isEmpty())
            ? repo.findAllActive(pageable)
            : repo.searchActive(search, pageable);
    List<Subscription> subscriptions =
        pageResult.getContent().stream()
            .map(SubscriptionJpaMapper::toDomain)
            .toList();
    return new PageResult<>(
        subscriptions,
        pageResult.getTotalElements(),
        pageResult.getTotalPages(),
        pageResult.getNumber(),
        pageResult.getSize());
  }

  public Subscription findById(Long id) {
    return repo.findActiveById(id)
        .map(SubscriptionJpaMapper::toDomain)
        .orElseThrow(() -> new SubscriptionNotFoundException(id));
  }
}
