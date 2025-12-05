/*
 * File: FingerprintJpaMapper.java
 * Purpose: Converts between FingerprintEntity (JPA) and Fingerprint (domain)
 * using FingerprintRehydrator. Maps R503 slot IDs and template backups for
 * archiving support. Maintains timestamps and version for optimistic locking.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintRehydrator;

@Component
public class FingerprintJpaMapper {

  public FingerprintEntity toEntity(Fingerprint fingerprint) {
    FingerprintEntity entity = new FingerprintEntity();
    entity.setId(fingerprint.id());
    entity.setUserId(fingerprint.userId());
    entity.setR503SlotId(fingerprint.r503SlotId());
    entity.setTemplateBackup(fingerprint.templateBackup());
    entity.setStatus(fingerprint.status());
    entity.setEnrolledAt(fingerprint.enrolledAt());
    entity.setArchivedAt(fingerprint.archivedAt());
    entity.setLastActivityAt(fingerprint.lastActivityAt());
    entity.setCreatedAt(fingerprint.createdAt());
    entity.setUpdatedAt(fingerprint.updatedAt());
    entity.setDeletedAt(fingerprint.deletedAt());
    entity.setVersion(fingerprint.version());
    return entity;
  }

  public Fingerprint toDomain(FingerprintEntity entity) {
    return FingerprintRehydrator.rehydrate(
        entity.getId(),
        entity.getUserId(),
        entity.getR503SlotId(),
        entity.getTemplateBackup(),
        entity.getStatus(),
        entity.getEnrolledAt(),
        entity.getArchivedAt(),
        entity.getLastActivityAt(),
        entity.getCreatedAt(),
        entity.getUpdatedAt(),
        entity.getDeletedAt(),
        entity.getVersion());
  }
}
