/*
 * File: FingerprintCommandPort.java
 * Purpose: Port defining command operations for fingerprint enrollment and
 * lifecycle management. Infrastructure adapters implement persistence and
 * state modification operations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;

public interface FingerprintCommandPort {
  Fingerprint save(Fingerprint fingerprint);

  void deleteById(Long id);

  boolean existsByUserId(Long userId);
}
