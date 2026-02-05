/*
 * File: FingerprintStatus.java
 * Purpose: Enumeration defining the possible states of a fingerprint.
 * ACTIVE means FMD stored and ready for verification.
 * ARCHIVED means template backed up but deactivated.
 * INACTIVE represents permanently revoked templates.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.core;

public enum FingerprintStatus {
  ACTIVE,
  ARCHIVED,
  INACTIVE
}
