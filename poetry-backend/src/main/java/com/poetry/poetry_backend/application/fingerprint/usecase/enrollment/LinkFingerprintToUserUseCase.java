/*
 * File: LinkFingerprintToUserUseCase.java
 * Purpose: Links pre-enrolled fingerprint (FMD) to newly created user.
 * Creates fingerprint record and user_fingerprint association.
 * Used after wizard enrollment completes before user creation.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;

public class LinkFingerprintToUserUseCase {
  private final FingerprintCommandPort fingerprintCmd;
  private final UserFingerprintCommandPort userFingerprintCmd;

  public LinkFingerprintToUserUseCase(
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
