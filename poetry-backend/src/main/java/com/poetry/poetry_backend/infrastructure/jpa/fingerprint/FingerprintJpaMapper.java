/*
 * File: FingerprintJpaMapper.java
 * Purpose: Converts between FingerprintEntity (JPA) and Fingerprint (domain)
 * using FingerprintRehydrator for persistence reconstruction. Maintains all
 * timestamps and version for optimistic locking.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintRehydrator;

@Component
public class FingerprintJpaMapper {

  public FingerprintEntity toEntity(Fingerprint fingerprint) {
    FingerprintEntity entity = new FingerprintEntity();
    entity.setId(fingerprint.id());
    entity.setUserId(fingerprint.userId());
    entity.setTemplateData(fingerprint.templateData());
    entity.setStatus(fingerprint.status());
    entity.setEnrolledAt(fingerprint.enrolledAt());
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
        entity.getTemplateData(),
        entity.getStatus(),
        entity.getEnrolledAt(),
        entity.getCreatedAt(),
        entity.getUpdatedAt(),
        entity.getDeletedAt(),
        entity.getVersion());
  }
}
