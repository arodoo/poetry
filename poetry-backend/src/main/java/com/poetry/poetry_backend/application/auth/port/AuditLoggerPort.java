/*
 * File: AuditLoggerPort.java
 * Purpose: Abstraction for emitting authentication audit events (login,
 * refresh, logout, register). Enables plugging persistent or external
 * logging systems without modifying application logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.port;

public interface AuditLoggerPort {
  void record(String eventType, String subject, String detail);
}
