/*
 * File: IdempotencyJpaAdapter.java
 * Purpose: JPA adapter for idempotency operations.
 * Thin adapter that delegates to IdempotencyOperations for business logic.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.common.port.IdempotencyPort;

@Transactional
public class IdempotencyJpaAdapter implements IdempotencyPort {
  private final IdempotencyOperations operations;

  public IdempotencyJpaAdapter(IdempotencyRepository repo) {
    this.operations = new IdempotencyOperations(repo);
  }

  @Override
  public boolean register(String key) {
    return operations.register(key);
  }

  @Override
  public Optional<StoredResponse> find(String key, String requestHash) {
    return operations.find(key, requestHash);
  }

  @Override
  public void store(String key, String requestHash, int status,
      String contentType, String bodyJson) {
    operations.store(key, requestHash, status, contentType, bodyJson);
  }
}
