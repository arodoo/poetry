/*
 * File: SlotHistoryReason.java
 * Purpose: Enum representing why a slot assignment changed.
 * Tracks lifecycle: enrollment, archival, restoration, manual ops.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.slot;

public enum SlotHistoryReason {
  ENROLLED,
  ARCHIVED_INACTIVE,
  RESTORED,
  MANUAL_RELEASE
}
