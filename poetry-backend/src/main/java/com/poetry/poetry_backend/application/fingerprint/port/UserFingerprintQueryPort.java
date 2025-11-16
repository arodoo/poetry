/*
 * File: UserFingerprintQueryPort.java
 * Purpose: Read port for user-fingerprint associations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

import java.util.List;

import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;

public interface UserFingerprintQueryPort {
  List<UserFingerprint> findByUserId(Long userId);

  List<UserFingerprint> findActiveByUserId(Long userId);

  List<UserFingerprint> findByFingerprintId(Long fingerprintId);
}
