/*
 * File: EmailNormalizerPort.java
 * Purpose: Defines contract for normalizing user supplied email addresses
 * during registration. Ensures consistent canonical form (case folding,
 * trimming, provider specific adjustments) prior to uniqueness checks and
 * persistence to avoid duplicate logical accounts. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.port.support;

public interface EmailNormalizerPort {
  /** Normalize an email into canonical stored form (must be idempotent). */
  String normalize(String rawEmail);
}
