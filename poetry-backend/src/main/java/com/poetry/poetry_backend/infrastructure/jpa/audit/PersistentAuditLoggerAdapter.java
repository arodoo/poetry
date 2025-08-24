/*
 * File: PersistentAuditLoggerAdapter.java
 * Purpose: JPA-backed implementation of AuditLoggerPort persisting auth
 * events (login, register, refresh, logout, misuse) with correlation id
 * for traceability. Decouples persistence from application layer while
 * enabling future analytics and monitoring exports. All Rights Reserved.
 * Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.audit;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.auth.port.AuditLoggerPort;

@Transactional
public class PersistentAuditLoggerAdapter implements AuditLoggerPort {
  private final AuditEventRepository repository;
  private final CorrelationIdProvider correlationProvider;

  public PersistentAuditLoggerAdapter(
      AuditEventRepository repository, CorrelationIdProvider provider) {
    this.repository = repository;
    this.correlationProvider = provider;
  }

  @Override
  public void record(String eventType, String subject, String detail) {
    AuditEventEntity e = new AuditEventEntity();
    e.setEventType(eventType);
    e.setSubject(subject);
    e.setDetail(detail);
    e.setCorrelationId(correlationProvider.get());
    repository.save(e);
  }
}
