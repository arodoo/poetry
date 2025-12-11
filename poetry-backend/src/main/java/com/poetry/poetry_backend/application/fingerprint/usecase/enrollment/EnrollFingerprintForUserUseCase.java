/*
 * File: EnrollFingerprintForUserUseCase.java
 * Purpose: Enrolls fingerprint with auto-assigned slot for user.
 * Finds first available slot (0-1500), creates fingerprint, links to user.
 * Records slot history and user_fingerprint association atomically.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import java.util.List;
import java.util.stream.IntStream;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintSlotHistoryCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;
import com.poetry.poetry_backend.domain.fingerprint.model.slot.FingerprintSlotHistory;
import com.poetry.poetry_backend.domain.fingerprint.model.slot.FingerprintSlotHistoryFactory;

public class EnrollFingerprintForUserUseCase {
  private final FingerprintCommandPort fingerprintCmd;
  private final FingerprintQueryPort fingerprintQuery;
  private final FingerprintSlotHistoryCommandPort slotHistoryCmd;
  private final UserFingerprintCommandPort userFingerprintCmd;

  public EnrollFingerprintForUserUseCase(
      FingerprintCommandPort fingerprintCmd,
      FingerprintQueryPort fingerprintQuery,
      FingerprintSlotHistoryCommandPort slotHistoryCmd,
      UserFingerprintCommandPort userFingerprintCmd) {
    this.fingerprintCmd = fingerprintCmd;
    this.fingerprintQuery = fingerprintQuery;
    this.slotHistoryCmd = slotHistoryCmd;
    this.userFingerprintCmd = userFingerprintCmd;
  }

  public Fingerprint execute(Long userId) {
    Integer availableSlot = findFirstAvailableSlot();
    if (availableSlot == null) {
      throw new IllegalStateException("error.fingerprint.slots.unavailable");
    }

    Fingerprint newFingerprint = FingerprintFactory.createNew(userId, availableSlot);
    Fingerprint saved = fingerprintCmd.save(newFingerprint);

    FingerprintSlotHistory history = FingerprintSlotHistoryFactory.createEnrollmentRecord(
        saved.id(), userId, availableSlot);
    slotHistoryCmd.save(history);

    UserFingerprint association = UserFingerprint.createNew(userId, saved.id());
    userFingerprintCmd.save(association);

    return saved;
  }

  private Integer findFirstAvailableSlot() {
    List<Fingerprint> allFingerprints = fingerprintQuery.findAll();
    List<Integer> usedSlots = allFingerprints.stream().map(Fingerprint::r503SlotId).toList();

    return IntStream.range(0, 1501)
        .filter(slot -> !usedSlots.contains(slot))
        .boxed()
        .findFirst()
        .orElse(null);
  }
}
