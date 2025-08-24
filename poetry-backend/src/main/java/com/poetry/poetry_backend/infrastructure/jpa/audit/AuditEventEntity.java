/*
 * File: AuditEventEntity.java
 * Purpose: JPA entity persisting authentication audit events including
 * type, subject, detail and correlation id for traceability across
 * distributed requests. Enables security reviews and anomaly detection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.audit;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = "auth_audit_events", indexes = {
    @Index(name = "idx_audit_type", columnList = "eventType"),
    @Index(name = "idx_audit_correlation", columnList = "correlationId") })
public class AuditEventEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, length = 64)
  private String eventType;
  @Column(length = 128)
  private String subject;
  @Column(length = 256)
  private String detail;
  @Column(length = 64)
  private String correlationId;
  @Column(nullable = false)
  private Instant createdAt = Instant.now();

  public Long getId() { return id; }
  public String getEventType() { return eventType; }
  public void setEventType(String eventType) { this.eventType = eventType; }
  public String getSubject() { return subject; }
  public void setSubject(String subject) { this.subject = subject; }
  public String getDetail() { return detail; }
  public void setDetail(String detail) { this.detail = detail; }
  public String getCorrelationId() { return correlationId; }
  public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
