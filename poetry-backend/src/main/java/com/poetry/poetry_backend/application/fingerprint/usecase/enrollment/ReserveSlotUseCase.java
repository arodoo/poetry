/*
 * File: ReserveSlotUseCase.java
 * Purpose: Reserves the first available R503 slot (0-1500) before user
 * creation. Returns slotId to frontend for hardware enrollment. Slot remains
 * unused until linked via LinkFingerprintToUserUseCase.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import java.util.List;
import java.util.stream.IntStream;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

public class ReserveSlotUseCase {
  private final FingerprintQueryPort fingerprintQuery;

  public ReserveSlotUseCase(FingerprintQueryPort fingerprintQuery) {
    this.fingerprintQuery = fingerprintQuery;
  }

  public Integer execute() {
    Integer availableSlot = findFirstAvailableSlot();
    if (availableSlot == null) {
      throw new IllegalStateException("error.fingerprint.slots.unavailable");
    }
    return availableSlot;
  }

  private Integer findFirstAvailableSlot() {
    List<Fingerprint> allFingerprints = fingerprintQuery.findAll();
    List<Integer> usedSlots = allFingerprints.stream()
        .map(Fingerprint::r503SlotId)
        .filter(java.util.Objects::nonNull)
        .toList();

    return IntStream.range(0, 1501)
        .filter(slot -> !usedSlots.contains(slot))
        .boxed()
        .findFirst()
        .orElse(null);
  }
}
