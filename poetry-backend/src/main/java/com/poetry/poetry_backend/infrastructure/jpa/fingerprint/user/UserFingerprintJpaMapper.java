/*
 * File: UserFingerprintJpaMapper.java
 * Purpose: Bidirectional mapper between UserFingerprint domain and entity.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.user;

import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;

public class UserFingerprintJpaMapper {
  public static UserFingerprintEntity toEntity(UserFingerprint domain) {
    UserFingerprintEntity entity = new UserFingerprintEntity();
    entity.setId(domain.id());
    entity.setUserId(domain.userId());
    entity.setFingerprintId(domain.fingerprintId());
    entity.setEnrolledAt(domain.enrolledAt());
    entity.setActive(domain.isActive());
    return entity;
  }

  public static UserFingerprint toDomain(UserFingerprintEntity entity) {
    return new UserFingerprint(
        entity.getId(),
        entity.getUserId(),
        entity.getFingerprintId(),
        entity.getEnrolledAt(),
        entity.isActive());
  }
}
