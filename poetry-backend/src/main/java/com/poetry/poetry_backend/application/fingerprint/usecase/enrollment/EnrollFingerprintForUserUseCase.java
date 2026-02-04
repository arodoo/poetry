/*
 * File: EnrollFingerprintForUserUseCase.java
 * Purpose: Enrolls fingerprint (FMD) and links it directly to a user.
 * Skips R503-specific slot assignment as verification is performed on FMDs.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;

public class EnrollFingerprintForUserUseCase {
  private final FingerprintCommandPort fingerprintCmd;
  private final UserFingerprintCommandPort userFingerprintCmd;

  public EnrollFingerprintForUserUseCase(
      FingerprintCommandPort fingerprintCmd,
      UserFingerprintCommandPort userFingerprintCmd) {
    this.fingerprintCmd = fingerprintCmd;
    this.userFingerprintCmd = userFingerprintCmd;
  }

  public Fingerprint execute(Long userId, String fmd) {
    Fingerprint newFingerprint = FingerprintFactory.createNew(userId, fmd);
    Fingerprint saved = fingerprintCmd.save(newFingerprint);

    UserFingerprint association = UserFingerprint.createNew(userId, saved.id());
    userFingerprintCmd.save(association);

    return saved;
  }
}
