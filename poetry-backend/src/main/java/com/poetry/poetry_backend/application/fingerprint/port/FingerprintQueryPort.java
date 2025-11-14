/*
 * File: FingerprintQueryPort.java
 * Purpose: Port defining query operations for fingerprint data retrieval.
 * Infrastructure adapters implement this to provide read access to enrolled
 * fingerprints filtered by user and status.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;

public interface FingerprintQueryPort {
  Optional<Fingerprint> findById(Long id);

  List<Fingerprint> findAll();

  List<Fingerprint> findByUserId(Long userId);

  List<Fingerprint> findActiveByUserId(Long userId);
}
