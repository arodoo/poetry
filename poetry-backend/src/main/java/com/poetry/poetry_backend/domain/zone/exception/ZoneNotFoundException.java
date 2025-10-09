/*
 * File: ZoneNotFoundException.java
 * Purpose: Domain exception for missing Zone aggregate using shared
 * not-found base. Thrown when zone lookup fails providing consistent
 * error handling across application and interface layers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.zone.exception;

import com.poetry.poetry_backend.domain.shared.exception.AbstractNotFoundException;

public class ZoneNotFoundException extends AbstractNotFoundException {
  public ZoneNotFoundException(Long id) {
    super("zone", String.valueOf(id), "Zone not found: " + id);
  }
}
