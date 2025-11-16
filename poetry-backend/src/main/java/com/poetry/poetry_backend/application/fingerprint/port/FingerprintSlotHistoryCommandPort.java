/*
 * File: FingerprintSlotHistoryCommandPort.java
 * Purpose: Write port for slot assignment audit trail operations.
 * Enables recording slot assignments and releases for forensics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintSlotHistory;

public interface FingerprintSlotHistoryCommandPort {
  FingerprintSlotHistory save(FingerprintSlotHistory history);
}
