/*
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IdempotencyRepository
    extends JpaRepository<IdempotencyRecord, Long> {
  Optional<IdempotencyRecord> findByKeyValue(String keyValue);
}
