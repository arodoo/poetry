/*
 * File: AccessLogPort.java
 * Purpose: Outbound port interface defining the contract for persisting access logs. Allows the application layer to trigger a physical access record without coupling itself to the underlying JPA or SQL technologies used.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

public interface AccessLogPort {
  void logAccess(Long userId);
}
