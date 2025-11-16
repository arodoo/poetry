/*
 * File: FingerprintSlotHistoryJpaAdapter.java
 * Purpose: JPA implementation of slot history command port.
 * Maps domain FingerprintSlotHistory to JPA entity for persistence.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintSlotHistoryCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintSlotHistory;

@Component
public class FingerprintSlotHistoryJpaAdapter
    implements FingerprintSlotHistoryCommandPort {
  private final FingerprintSlotHistoryJpaRepository repo;
  private final FingerprintSlotHistoryJpaMapper mapper;

  public FingerprintSlotHistoryJpaAdapter(
      FingerprintSlotHistoryJpaRepository repo,
      FingerprintSlotHistoryJpaMapper mapper) {
    this.repo = repo;
    this.mapper = mapper;
  }

  @Override
  public FingerprintSlotHistory save(FingerprintSlotHistory history) {
    FingerprintSlotHistoryEntity entity = mapper.toEntity(history);
    FingerprintSlotHistoryEntity saved = repo.save(entity);
    return mapper.toDomain(saved);
  }
}
