/*
 Spring Data repository that stores idempotency records keyed by a
 unique request identifier. It exposes a finder by the natural key to
 support fast duplicate detection in the idempotency adapter. The
 repository is part of the infrastructure layer and hides persistence
 details from application services. All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IdempotencyRepository
    extends JpaRepository<IdempotencyRecord, Long> {
  Optional<IdempotencyRecord> findByKeyValue(String keyValue);
}
