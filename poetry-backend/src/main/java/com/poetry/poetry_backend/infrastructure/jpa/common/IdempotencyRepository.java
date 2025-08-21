/*
 * File: IdempotencyRepository.java
 * Purpose: Repository interface for idempotency record persistence. It
 * defines the operations needed by adapters to persist and retrieve
 * idempotency records used by filters and use cases. Abstracting the
 * repository allows switching JPA implementations without affecting
 * higher-level code.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IdempotencyRepository
    extends JpaRepository<IdempotencyRecord, Long> {
  Optional<IdempotencyRecord> findByKeyValue(String keyValue);
}
