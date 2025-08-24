/*
 * File: AuditEventRepository.java
 * Purpose: Spring Data repository exposing persistence operations for
 * authentication audit events. Supports querying by correlation id or
 * event type enabling diagnostic tooling and monitoring adapters.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.audit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditEventRepository extends JpaRepository<AuditEventEntity, Long> {
  List<AuditEventEntity> findByCorrelationId(String correlationId);
  List<AuditEventEntity> findByEventType(String eventType);
}
