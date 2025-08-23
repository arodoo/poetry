/*
 * File: InMemoryAuditLogger.java
 * Purpose: Captures authentication audit events in memory for assertions
 * within tests. Provides lightweight event recording implementation of
 * AuditLoggerPort without external dependencies or persistence.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.util.ArrayList;
import java.util.List;

import com.poetry.poetry_backend.application.auth.port.AuditLoggerPort;

public class InMemoryAuditLogger implements AuditLoggerPort {
  private final List<String> events = new ArrayList<>();
  public void record(String eventType, String subject, String detail) {
    events.add(eventType +":"+ subject +":"+ detail);
  }
  public List<String> events() { return events; }
}
