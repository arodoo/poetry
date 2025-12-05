/*
 * File: FingerprintFactory.java
 * Purpose: Facade delegating to FingerprintCreator and FingerprintArchiver.
 * Maintains compatibility with existing use cases while splitting logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.core;

public class FingerprintFactory {

  public static Fingerprint createNew(Long userId, Integer r503SlotId) {
    return FingerprintCreator.createNew(userId, r503SlotId);
  }

  public static Fingerprint markInactive(Fingerprint fingerprint) {
    return FingerprintCreator.markInactive(fingerprint);
  }

  public static Fingerprint markArchived(
      Fingerprint fingerprint, byte[] templateBackup) {
    return FingerprintArchiver.markArchived(fingerprint, templateBackup);
  }

  public static Fingerprint restoreFromArchive(
      Fingerprint fingerprint, Integer newR503SlotId) {
    return FingerprintArchiver.restoreFromArchive(
        fingerprint, newR503SlotId);
  }
}
