/*
 * File: FingerprintSlotHistoryJpaMapper.java
 * Purpose: Bidirectional mapping between domain FingerprintSlotHistory
 * and JPA entity. Handles null safety for releasedAt field.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.history;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.domain.fingerprint.model.slot.FingerprintSlotHistory;

@Component
public class FingerprintSlotHistoryJpaMapper {

  public FingerprintSlotHistoryEntity toEntity(FingerprintSlotHistory history) {
    FingerprintSlotHistoryEntity entity = new FingerprintSlotHistoryEntity();
    entity.setId(history.id());
    entity.setFingerprintId(history.fingerprintId());
    entity.setUserId(history.userId());
    entity.setR503SlotId(history.r503SlotId());
    entity.setAssignedAt(history.assignedAt());
    entity.setReleasedAt(history.releasedAt());
    entity.setReason(history.reason());
    return entity;
  }

  public FingerprintSlotHistory toDomain(FingerprintSlotHistoryEntity entity) {
    return new FingerprintSlotHistory(
        entity.getId(),
        entity.getFingerprintId(),
        entity.getUserId(),
        entity.getR503SlotId(),
        entity.getAssignedAt(),
        entity.getReleasedAt(),
        entity.getReason());
  }
}
