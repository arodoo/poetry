/*
 * File: MembershipVersionMismatchException.java
 * Purpose: Domain exception for optimistic locking conflicts during
 * membership updates. Indicates version mismatch requiring client
 * retry with fresh data following ETag patterns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.membership.exception;

public class MembershipVersionMismatchException
    extends RuntimeException {
  public MembershipVersionMismatchException(Long id) {
    super("membership.version.mismatch: " + id);
  }
}
