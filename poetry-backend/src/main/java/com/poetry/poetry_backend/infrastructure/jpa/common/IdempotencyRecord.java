/*
 * File: IdempotencyRecord.java
 * Purpose: JPA entity representing idempotency metadata for requests.
 * This record maps stored keys, creation timestamps and result references
 * to allow detection and reuse of previous responses for identical keys.
 * It supports the idempotency adapter and filters in the infrastructure.
 * Extended with request hash and serialized response for replay semantics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "idempotency_records")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IdempotencyRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @EqualsAndHashCode.Include
  @Column(unique = true, nullable = false, length = 128)
  private String keyValue;

  @Column(length = 64)
  private String requestHash;

  @Lob
  private String responseBody;

  private Integer responseStatus;

  @Column(length = 64)
  private String responseContentType;

  private Instant createdAt = Instant.now();
}
