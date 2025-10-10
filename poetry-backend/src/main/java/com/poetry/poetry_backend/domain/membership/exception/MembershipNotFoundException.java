/*
 * File: MembershipNotFoundException.java
 * Purpose: Domain exception for missing Membership aggregate using
 * shared not-found base. Thrown when membership lookup fails providing
 * consistent error handling across application and interface layers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.membership.exception;

import com.poetry.poetry_backend.domain.shared.exception.AbstractNotFoundException;

public class MembershipNotFoundException
    extends AbstractNotFoundException {
  public MembershipNotFoundException(Long id) {
    super("membership", String.valueOf(id),
        "Membership not found: " + id);
  }
}
