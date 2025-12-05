/*
 * File: EnrollFingerprintUseCase.java
 * Purpose: Orchestrates fingerprint enrollment with R503 slot assignment.
 * Receives slot ID from hardware service after successful R503 enrollment.
 * Records assignment in slot history audit trail for forensic analysis.
 * DEV_BYPASS: r503SlotId=999 for testing without physical sensor.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintSlotHistoryCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;
import com.poetry.poetry_backend.domain.fingerprint.model.slot.FingerprintSlotHistoryFactory;

public class EnrollFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;
  private final FingerprintSlotHistoryCommandPort historyCommandPort;

  public EnrollFingerprintUseCase(
      FingerprintCommandPort commandPort,
      FingerprintQueryPort queryPort,
      FingerprintSlotHistoryCommandPort historyCommandPort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
    this.historyCommandPort = historyCommandPort;
  }

  public Fingerprint execute(Long userId, Integer r503SlotId) {
    Fingerprint newFingerprint =
        FingerprintFactory.createNew(userId, r503SlotId);

    Fingerprint saved = commandPort.save(newFingerprint);

    historyCommandPort.save(
        FingerprintSlotHistoryFactory.createEnrollmentRecord(
            saved.id(), userId, r503SlotId));

    return saved;
  }
}
