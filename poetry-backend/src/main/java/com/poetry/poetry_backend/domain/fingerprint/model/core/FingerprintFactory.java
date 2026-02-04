/*
 * File: FingerprintFactory.java
 * Purpose: Facade delegating to FingerprintCreator and FingerprintArchiver.
 * Handles HID Digital Persona fingerprint domain object creation.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.core;

import com.poetry.poetry_backend.domain.fingerprint.model.lifecycle.FingerprintArchiver;
import com.poetry.poetry_backend.domain.fingerprint.model.lifecycle.FingerprintCreator;

public class FingerprintFactory {

  public static Fingerprint createNew(Long userId, String fmd) {
    return FingerprintCreator.createNew(userId, fmd);
  }

  public static Fingerprint markInactive(Fingerprint fingerprint) {
    return FingerprintCreator.markInactive(fingerprint);
  }

  public static Fingerprint markArchived(Fingerprint fingerprint) {
    return FingerprintArchiver.markArchived(fingerprint);
  }

  public static Fingerprint restoreFromArchive(Fingerprint fingerprint) {
    return FingerprintArchiver.restoreFromArchive(fingerprint);
  }
}
