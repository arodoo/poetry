/*
 * File: UserFingerprintCommandPort.java
 * Purpose: Write port for user-fingerprint associations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;

public interface UserFingerprintCommandPort {
  UserFingerprint save(UserFingerprint userFingerprint);

  void delete(Long id);
}
