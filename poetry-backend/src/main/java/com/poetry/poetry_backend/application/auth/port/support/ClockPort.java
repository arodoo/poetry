/*
 * File: ClockPort.java
 * Purpose: Provides an abstraction for current time retrieval so that
 * time-dependent operations (token TTL calculations) can be tested
 * deterministically and future time sources can be swapped easily.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.port.support;

import java.time.Instant;

public interface ClockPort {
  Instant now();
}
