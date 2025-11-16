/*
 * File: LinkFingerprintToUserUseCase.java
 * Purpose: Links pre-enrolled fingerprint slot to newly created user.
 * Creates fingerprint record, slot history entry, and user_fingerprint
 * association. Used after wizard enrollment completes before user creation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintSlotHistoryCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintFactory;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintSlotHistory;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintSlotHistoryFactory;
import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;

public class LinkFingerprintToUserUseCase {
  private final FingerprintCommandPort fingerprintCmd;
  private final FingerprintSlotHistoryCommandPort slotHistoryCmd;
  private final UserFingerprintCommandPort userFingerprintCmd;

  public LinkFingerprintToUserUseCase(
      FingerprintCommandPort fingerprintCmd,
      FingerprintSlotHistoryCommandPort slotHistoryCmd,
      UserFingerprintCommandPort userFingerprintCmd) {
    this.fingerprintCmd = fingerprintCmd;
    this.slotHistoryCmd = slotHistoryCmd;
    this.userFingerprintCmd = userFingerprintCmd;
  }

  public Fingerprint execute(Long userId, Integer slotId) {
    Fingerprint newFingerprint = FingerprintFactory.createNew(userId, slotId);
    Fingerprint saved = fingerprintCmd.save(newFingerprint);

    FingerprintSlotHistory history =
        FingerprintSlotHistoryFactory.createEnrollmentRecord(
            saved.id(), userId, slotId);
    slotHistoryCmd.save(history);

    UserFingerprint association =
        UserFingerprint.createNew(userId, saved.id());
    userFingerprintCmd.save(association);

    return saved;
  }
}
