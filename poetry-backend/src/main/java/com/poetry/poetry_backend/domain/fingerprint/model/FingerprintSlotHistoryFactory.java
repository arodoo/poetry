/*
 * File: FingerprintSlotHistoryFactory.java
 * Purpose: Creates new slot history records for enrollment events.
 * Timestamps assignment automatically. Released records set via update.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public class FingerprintSlotHistoryFactory {

  public static FingerprintSlotHistory createEnrollmentRecord(
      Long fingerprintId, Long userId, Integer r503SlotId) {
    return new FingerprintSlotHistory(
        null,
        fingerprintId,
        userId,
        r503SlotId,
        Instant.now(),
        null,
        SlotHistoryReason.ENROLLED);
  }

  public static FingerprintSlotHistory createArchivalRecord(
      Long fingerprintId, Long userId, Integer r503SlotId) {
    return new FingerprintSlotHistory(
        null,
        fingerprintId,
        userId,
        r503SlotId,
        Instant.now(),
        Instant.now(),
        SlotHistoryReason.ARCHIVED_INACTIVE);
  }

  public static FingerprintSlotHistory createRestorationRecord(
      Long fingerprintId, Long userId, Integer newR503SlotId) {
    return new FingerprintSlotHistory(
        null,
        fingerprintId,
        userId,
        newR503SlotId,
        Instant.now(),
        null,
        SlotHistoryReason.RESTORED);
  }
}
