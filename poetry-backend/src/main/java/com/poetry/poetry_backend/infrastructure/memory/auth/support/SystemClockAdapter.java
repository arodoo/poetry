/*
 * File: SystemClockAdapter.java
 * Purpose: Provides current time using system UTC clock fulfilling the
 * ClockPort. Facilitates deterministic testing by allowing substitution
 * with fixed or offset clocks in other adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.auth.support;

import java.time.Instant;

import com.poetry.poetry_backend.application.auth.port.support.ClockPort;

public class SystemClockAdapter implements ClockPort {
  public Instant now() {
    return Instant.now();
  }
}
