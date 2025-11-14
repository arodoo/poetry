/*
 * File: FingerprintStatus.java
 * Purpose: Enumeration defining the possible states of a fingerprint
 * enrollment. ACTIVE fingerprints are available for verification, while
 * INACTIVE represents revoked or disabled templates for security purposes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

public enum FingerprintStatus {
  ACTIVE,
  INACTIVE
}
