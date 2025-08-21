/*
 * File: ETagPort.java
 * Purpose: Provide an abstraction for ETag generation and validation used in
 * the application to support conditional requests and caching semantics. The
 * port enables application use-cases to compute and compare ETags without
 * depending on infrastructure-specific implementations. Implementations may
 * compute ETags using hashing strategies or delegate to persistence layers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.common.port;

public interface ETagPort {
  String compute(String canonical);
}
