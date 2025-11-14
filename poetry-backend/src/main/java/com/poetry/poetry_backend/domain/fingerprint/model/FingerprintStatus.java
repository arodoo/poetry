/*
 * File: FingerprintStatus.java
 * Purpose: Enumeration defining the possible states of a fingerprint
 * enrollment. ACTIVE means template stored in R503 slot and ready for
 * verification. ARCHIVED means template backed up in DB but slot freed.
 * INACTIVE represents permanently revoked templates for security.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

public enum FingerprintStatus {
  ACTIVE,
  ARCHIVED,
  INACTIVE
}
