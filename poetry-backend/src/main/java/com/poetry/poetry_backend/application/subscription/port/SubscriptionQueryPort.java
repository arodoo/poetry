/*
 * File: SubscriptionQueryPort.java
 * Purpose: Define query operations to retrieve subscription plan data used
 * by the application layer. This port abstracts read-only access decoupling
 * use-cases from storage implementation and enabling in-memory testing.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.port;

import java.util.List;

import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;

public interface SubscriptionQueryPort {
  List<Subscription> findAll();

  PageResult<Subscription> findAllPaged(
      int page,
      int size,
      String search);

  Subscription findById(Long id);
}
