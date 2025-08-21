/*
 * File: IdempotencyJpaAdapter.java
 * Purpose: JPA adapter responsible for storing and retrieving idempotency
 * records used by idempotent endpoints. This adapter maps domain operations
 * to database entities and provides a persistence-backed implementation
 * of idempotency storage to ensure correctness across restarts.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.common.port.IdempotencyPort;

@Transactional
public class IdempotencyJpaAdapter implements IdempotencyPort {
  private static final Logger log =
      LoggerFactory.getLogger(IdempotencyJpaAdapter.class);
  private final IdempotencyRepository repo;

  public IdempotencyJpaAdapter(IdempotencyRepository repo) {
    this.repo = repo;
  }

  public boolean register(String key) {
    if (key == null || key.isBlank()) {
      return true;
    }
    if (repo.findByKeyValue(key).isPresent()) {
      return false;
    }
    try {
      IdempotencyRecord r = new IdempotencyRecord();
      r.setKeyValue(key);
      repo.save(r);
      return true;
    } catch (RuntimeException e) {
      log.debug("Idempotency duplicate detected: {}", key);
      return false;
    }
  }
}
